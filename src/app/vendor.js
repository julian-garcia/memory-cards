import 'nojs';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
// import { MDCNotchedOutline } from '@material/notched-outline';

// MDCRipple.attachTo(document.querySelector('.show-form-button'));
// MDCRipple.attachTo(document.querySelector('.card-form__button'));
MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
MDCTextField.attachTo(document.querySelector('.mdc-text-field--textarea'));
// MDCNotchedOutline.attachTo(document.querySelector('.mdc-notched-outline'));

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});