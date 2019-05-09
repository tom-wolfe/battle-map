import * as Actions from './actions';
import { initialState } from './initial';
import { TokensState } from './state';

export function tokensReducer(state: TokensState = initialState, action: Actions.TokensActions): TokensState {
  switch (action.type) {
    case Actions.SetTokens.TYPE: return { ...state, tokens: action.tokens };
    case Actions.SetImage.TYPE: return { ...state, images: { ...state.images, [action.url]: action.image } };
    default: return state;
  }
}
