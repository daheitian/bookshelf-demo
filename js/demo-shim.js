// 静态演示版适配层：把 app.js 里的 /api/* 请求接到内嵌的合成数据上。
// 目的只有一个 —— 让线上 GitHub Pages 版本不依赖任何服务端，页面逻辑与正式版完全一致。
(function () {
  // 静态版没有服务端可填 Key，别在首屏 1.4 秒后弹「换成你自己的书房」
  try {
    localStorage.setItem('bookshelf.setupSeen', '1');
  } catch (err) {
    /* 隐私模式下 localStorage 不可写，忽略 */
  }

  const LIB = window.__DEMO || { books: [], categories: [] };
  const origFetch = window.fetch.bind(window);

  const reply = (obj, status) =>
    Promise.resolve(
      new Response(JSON.stringify(obj), {
        status: status || 200,
        headers: { 'content-type': 'application/json' },
      })
    );

  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input && input.url) || '';
    const path = url.replace(/^https?:\/\/[^/]+/, '').split('?')[0];

    if (path === '/api/library') return reply(Object.assign({}, LIB, { scope: 'demo' }));
    if (path === '/api/status') return reply({ ok: true, scope: 'demo', demo: true });
    // 演示版没有真实划线/想法，计数和正文一起留空，免得「说有 18 条、点开是空的」
    if (path === '/api/nb') return reply({});
    if (path === '/api/notes') return reply({ marks: [], thoughts: [], info: {} });
    // 静态版没有服务端，填 Key 这条路走不通，直接说清楚
    if (path === '/api/me')
      return reply({ ok: false, error: '这是静态演示版，不支持接入微信读书' });
    if (path === '/api/cover') return reply({}, 404);
    return origFetch(input, init);
  };

  // 点房间名会弹出「填 Key 换书房」，静态版拦掉，别让人白填一遍
  document.addEventListener(
    'click',
    function (e) {
      const t = e.target;
      if (t && t.closest && t.closest('#roomOpen, #roomName')) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true
  );

  // 页脚改口：这里展示的是合成书架，不是谁的账号
  document.addEventListener('DOMContentLoaded', function () {
    const c = document.querySelector('.credit');
    if (c) c.textContent = '静态演示版 · 书架为合成书目，与微信读书账号无关';
  });
})();
