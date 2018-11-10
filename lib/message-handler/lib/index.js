
const out = () => {
  document.getElementById('update-info').classList.remove('in');
  document.getElementById('update-info').classList.add('out');
};

const timeout = (time = 3000) => setTimeout(() => {
  out();
}, time);

const alert = (type = 'out', msg = '') => {

  document.getElementById('update-info').classList = '';
  document.getElementById('update-info').innerHTML = `${msg}`;

  switch (type) {
    case 'success':
      document.getElementById('update-info').classList = 'alert alert-success fade in';
      timeout();
      break;
    case 'warning':
      document.getElementById('update-info').classList = 'alert alert-warning fade in';
      timeout();
      break;
    case 'out':
      out();
      break;
  }
};

export default alert;