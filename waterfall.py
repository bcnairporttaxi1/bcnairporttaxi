import os, time, json, sys
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', r'C:\Users\boxin\.claude\skills\seo\ms-playwright')
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
with sync_playwright() as p:
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=3)
    ctx.add_init_script("try{localStorage.setItem('bcn-cookie-consent','all')}catch(e){}")
    pg=ctx.new_page(); cdp=ctx.new_cdp_session(pg); cdp.send('Network.enable')
    cdp.send('Network.emulateNetworkConditions',{'offline':False,'latency':150,
      'downloadThroughput':1.6*1024*1024/8,'uploadThroughput':750*1024/8})
    cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
    pg.goto('https://bcnairporttaxi.es/en?w='+str(int(time.time())), wait_until='load', timeout=150000)
    pg.wait_for_timeout(5000)
    d = pg.evaluate("""() => {
      const r = performance.getEntriesByType('resource').map(x => ({
        n: x.name.split('/').pop().split('?')[0].slice(0,40),
        t: x.initiatorType, start: Math.round(x.startTime), end: Math.round(x.responseEnd),
        kb: Math.round((x.transferSize||0)/1024)
      })).sort((a,b)=>a.start-b.start);
      const nav = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint').map(p=>({n:p.name,t:Math.round(p.startTime)}));
      const longs = performance.getEntriesByType('longtask')||[];
      return {html:{ttfb:Math.round(nav.responseStart), htmlDone:Math.round(nav.responseEnd),
                    domInteractive:Math.round(nav.domInteractive), domContentLoaded:Math.round(nav.domContentLoadedEventEnd)},
              paint, first12: r.slice(0,12)};
    }""")
    print('nav:', json.dumps(d['html']))
    print('paint:', json.dumps(d['paint']))
    print('first resources:')
    for x in d['first12']:
        print(f"   {x['start']:5d}→{x['end']:5d}ms  {x['kb']:4d}KB  {x['t']:8s} {x['n']}")
    b.close()
