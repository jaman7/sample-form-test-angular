import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment as env } from '@env/environment';
import { Language } from '@app/shared/enums/language';
import { initStateFromSessionStorage } from '@app/core/meta-reducers/init-state-storage.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { languageReducer } from './language/store';
import { debug } from './meta-reducers/debug.reducer';
import { RouterStateUrl } from './router/router.state';

export interface AppState {
  language: Language;

  router: RouterReducerState<RouterStateUrl>;
}
/**
 * Reducers for AppState
 */
export const reducers: ActionReducerMap<AppState> = {
  language: languageReducer,
  router: routerReducer,
};

/**
 * Meta reducers with initialization state from sessionStorage
 */
export const metaReducers: MetaReducer<AppState>[] = [initStateFromSessionStorage];

/** Debug information for changes application state */
if (!env.production) {
  metaReducers.unshift(debug);
}

/**
 * Select for language state
 */
export const selectLanguageState = createFeatureSelector<Language>('language');

export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
