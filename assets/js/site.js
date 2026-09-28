/* Shared behaviour for the service pages: year, header shadow, mobile menu, FAQ accordion. */
(function(){
  "use strict";
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var header = document.getElementById('header');
  var onScroll = function(){ header.classList.toggle('is-stuck', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var closeBtn = document.getElementById('drawerClose');
  function openMenu(){
    drawer.hidden = false;
    requestAnimationFrame(function(){ document.body.classList.add('menu-open'); });
    burger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
    setTimeout(function(){ if(!document.body.classList.contains('menu-open')) drawer.hidden = true; }, 320);
  }
  burger.addEventListener('click', function(){ document.body.classList.contains('menu-open') ? closeMenu() : openMenu(); });
  closeBtn.addEventListener('click', closeMenu);
  drawer.addEventListener('click', function(e){ if(e.target === drawer) closeMenu(); });
  Array.prototype.forEach.call(drawer.querySelectorAll('a'), function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu(); });

  Array.prototype.forEach.call(document.querySelectorAll('.faq__q'), function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq__item');
      var isOpen = item.classList.contains('open');
      Array.prototype.forEach.call(document.querySelectorAll('.faq__item'), function(other){
        other.classList.remove('open');
        other.querySelector('.faq__q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
})();
