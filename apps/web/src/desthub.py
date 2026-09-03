import os
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', r'C:\Users\boxin\.claude\skills\seo\ms-playwright')
from playwright.sync_api import sync_playwright
OUT=r'C:\Users\boxin\AppData\Local\Temp\claude\C--Users-boxin\428cacc1-5b73-4593-887a-b303d7ef8b1c\scratchpad\shots'
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={'width':1280,'height':900},device_scale_factor=2)
    ctx.add_init_script("try{localStorage.setItem('bcn-cookie-consent','all')}catch(e){}")
    pg=ctx.new_page(); pg.goto('http://localhost:3000/en/destinations',wait_until='networkidle',timeout=120000)
    pg.wait_for_timeout(2000)
    # find a card whose cover is drawn rather than photographic
    n = pg.evaluate("""() => {
      const svgCards = [...document.querySelectorAll('a,div')].filter(e => e.querySelector('svg[viewBox="0 0 320 200"]'));
      if (!svgCards.length) return null;
      svgCards[0].scrollIntoView({block:'center'});
      return svgCards.length;
    }""")
    print('cards with a drawn cover:', n)
    pg.wait_for_timeout(1200)
    pg.screenshot(path=f'{OUT}/dest-drawn.png')
    print('photo covers:', pg.evaluate("() => document.querySelectorAll('img[src*=\"/img/destinations/\"]').length"))
    pg.goto('http://localhost:3000/en/destinations/cadaques',wait_until='networkidle',timeout=90000)
    pg.wait_for_timeout(1500)
    pg.evaluate("() => { const e=document.querySelector('svg[viewBox=\"0 0 320 200\"]'); if(e) e.scrollIntoView({block:'center'}); }")
    pg.wait_for_timeout(900)
    pg.screenshot(path=f'{OUT}/dest-cadaques.png')
    b.close()
