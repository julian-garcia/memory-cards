import '../style/main.scss';
import { uiModule } from './ui/cards';

// Event listeners for showing/hiding content, adding/removing cards

uiModule.initialiseCardForm();
uiModule.deleteCard();
uiModule.addCardListener();
uiModule.toggleContent();
uiModule.refreshContent();