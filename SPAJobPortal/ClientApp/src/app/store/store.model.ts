import { IJobDetails } from '../components/shared/model/IJobDetails';
import { FluxStandardAction } from 'flux-standard-action';
interface MetaData { };

// Flux-standard-action gives us stronger typing of our actions.
export type FSAction = FluxStandardAction<any, MetaData | null | number>;
//export type FSDomainValueAction = FluxStandardAction<IDomainValuePayload | null, MetaData | null>;


export interface ClientState<State> {
  state: State | null;
  loading: boolean;
  error: any;
}

export interface IAppState {
  activedescriptionJobDetails?: ClientState<IJobDetails>;
  descriptionJobDetail?: ClientState<IJobDetails>;
  descritionCommentFocus?: boolean;
  // cachedSearchState?: ClientState<SearchState>;
}

export const INITIAL_STATE: IAppState = <IAppState>{
  activedescriptionJobDetails: {},
  descriptionJobDetail: {},
  descritionCommentFocus: false
}

