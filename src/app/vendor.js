import 'nojs';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';

MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
MDCTextField.attachTo(document.querySelector('.mdc-text-field--textarea'));

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});