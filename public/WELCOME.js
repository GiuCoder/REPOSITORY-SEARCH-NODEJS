const frontCover = document.querySelector('.front-cover');
if (frontCover) {
  frontCover.addEventListener('click', () => {
    document.body.classList.toggle('open-cover');
  });
  frontCover.style.cursor = 'pointer';
  frontCover.addEventListener('error', () => {
    console.log('Failed to load front cover image');
  });
  frontCover.style.webkitUserSelect = 'text';
  frontCover.style.msUserSelect = 'text';
  frontCover.style.userSelect = 'text';
}

const welcomePage = document.querySelector('.welcome-page');
if (welcomePage) {
  welcomePage.addEventListener('click', () => {
    document.body.classList.toggle('open-welcome-page');
  });
  welcomePage.style.cursor = 'pointer';
  welcomePage.addEventListener('error', () => {
    console.log('Failed to load welcome page image');
  });
  welcomePage.style.webkitUserSelect = 'text';
  welcomePage.style.msUserSelect = 'text';
  welcomePage.style.userSelect = 'text';
}

const backCover = document.querySelector('.back-cover');
if (backCover) {
  backCover.addEventListener('click', () => {
    document.body.classList.toggle('close-book');
    window.location.href = "/";
  });
  backCover.style.cursor = 'pointer';
  backCover.addEventListener('error', () => {
    console.log('Failed to load back cover image');
  });
  backCover.style.webkitUserSelect = 'text';
  backCover.style.msUserSelect = 'text';
  backCover.style.userSelect = 'text';
}
