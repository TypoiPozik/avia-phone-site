const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
});

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

const revealTargets = document.querySelectorAll(
  '.card, .feature, .section-title, .section-subtitle'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

const form = document.getElementById('orderForm');
const status = document.getElementById('orderStatus');

const phoneMask = (value) => {
  const digits = value.replace(/\D/g, '').replace(/^[78]/, '');
  let out = '';
  if (digits.length > 0) out += '+7';
  if (digits.length > 1) out += ' (' + digits.slice(1, 4);
  if (digits.length >= 4) out += ') ' + digits.slice(4, 7);
  if (digits.length >= 7) out += '-' + digits.slice(7, 9);
  if (digits.length >= 9) out += '-' + digits.slice(9, 11);
  return out;
};

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneMask(phoneInput.value);
});

const validate = () => {
  const name = document.getElementById('name');
  const model = document.getElementById('model');
  let valid = true;

  const check = (el, ok) => {
    el.classList.toggle('is-invalid', !ok);
    valid = valid && ok;
  };

  check(name, name.value.trim().length >= 2);
  check(phoneInput, phoneInput.value.replace(/\D/g, '').length === 11);
  check(model, model.value !== '');

  return valid;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validate()) {
    status.textContent = 'Пожалуйста, заполните все поля корректно.';
    status.className = 'order__status is-error';
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Отправляем…';

  setTimeout(() => {
    const name = document.getElementById('name').value.trim();
    const model = document.getElementById('model').value;
    status.textContent = `${name}, заявка на ${model} принята! Мы свяжемся с вами при старте продаж.`;
    status.className = 'order__status is-success';
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Отправить заявку';
  }, 900);
});
