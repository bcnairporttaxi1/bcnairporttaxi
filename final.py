import os, time, json, sys
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', r'C:\Users\boxin\.claude\skills\seo\ms-playwright')
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
B='https://bcnairporttaxi.es'; V=f'?v={int(time.time())}'
INIT = """
window.__lcp=0; new PerformanceObserver(l=>{for(const e of l.getEntries()) window.__lcp=e.startTime})
  .observe({type:'largest-contentful-paint',buffered:true});
window.__cls=0; new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) window.__cls+=e.value})
  .observe({type:'layout-shift',buffered:true});
try{localStorage.setItem('bcn-cookie-consent','all')}catch(e){}
"""
with sync_playwright() as p:
    b=p.chromium.launch()
    # ── CSP: does anything get blocked?
    ctx=b.new_context(viewport={'width':1280,'height':900})
    ctx.add_init_script(INIT)
    pg=ctx.new_page(); viol=[]
    pg.on('console', lambda m: viol.append(m.text[:150]) if 'Content Security Policy' in m.text or 'Refused to' in m.text else None)
    pg.on('pageerror', lambda e: viol.append('ERR '+str(e)[:120]))
    for path in ['/en','/en/book','/de/checkout','/en/destinations/sitges']:
        pg.goto(B+path+V, wait_until='networkidle', timeout=120000); pg.wait_for_timeout(2500)
    print('CSP violations / errors:', viol[:6] or 'none')
    pg.goto(B+'/en/book'+V, wait_until='networkidle', timeout=120000); pg.wait_for_timeout(3000)
    print('map tiles loaded:', pg.evaluate("() => document.querySelectorAll('.leaflet-tile-loaded').length"))
    ctx.close()

    # ── LCP on a throttled phone, same profile as the audit.
    for path in ['/en','/en/book']:
        ctx=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=3)
        ctx.add_init_script(INIT)
        pg=ctx.new_page(); cdp=ctx.new_cdp_session(pg); cdp.send('Network.enable')
        cdp.send('Network.emulateNetworkConditions',{'offline':False,'latency':150,
          'downloadThroughput':1.6*1024*1024/8,'uploadThroughput':750*1024/8})
        cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
        pg.goto(B+path+V, wait_until='load', timeout=150000); pg.wait_for_timeout(5000)
        m=pg.evaluate("""() => {
          const nav=performance.getEntriesByType('navigation')[0];
          const fcp=performance.getEntriesByName('first-contentful-paint')[0];
          const js=performance.getEntriesByType('resource').filter(r=>r.name.endsWith('.js'))
            .reduce((s,r)=>s+(r.transferSize||0),0);
          return {lcp:Math.round(window.__lcp), fcp:fcp?Math.round(fcp.startTime):null,
                  cls:Math.round(window.__cls*1000)/1000, jsKB:Math.round(js/1024)};
        }""")
        print(path, json.dumps(m))
        ctx.close()
    b.close()
