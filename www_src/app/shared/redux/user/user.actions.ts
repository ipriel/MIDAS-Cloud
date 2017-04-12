import { Action } from '@ngrx/store';
import { type } from '../shared/util';
import { State } from './user.store';

export const ActionTypes = {
  INIT: type('[Server] INIT'),
  LOAD_DATA: type('[Local] LOAD DATA'),
  ADD_DEVICE: type('[Dev] ADD DEVICE'),
  S_CONFIRM_PAIR: type('[Server] CONFIRM PAIR'),
  L_CONFIRM_PAIR: type('[Local] CONFIRM PAIR'),
  S_DEPAIR_DEVICE: type('[Server] DEPAIR DEVICE'),
  L_DEPAIR_DEVICE: type('[Local] DEPAIR DEVICE'),
  S_ADD_MIRROR: type('[Server] ADD MIRROR'),
  L_ADD_MIRROR: type('[Local] ADD MIRROR'),
  S_EDIT_MIRROR: type('[Server] EDIT MIRROR'),
  L_EDIT_MIRROR: type('[Local] EDIT MIRROR'),
  S_REM_MIRROR: type('[Server] REM MIRROR'),
  L_REM_MIRROR: type('[Local] REM MIRROR'),
  S_LINK_SVC: type('[Server] LINK SVC'),
  L_LINK_SVC: type('[Local] LINK SVC'),
  S_UNLINK_SVC: type('[Server] UNLINK SVC'),
  L_UNLINK_SVC: type('[Local] UNLINK SVC'),
  S_ADD_SVC: type('[Server] ADD SVC'),
  L_ADD_SVC: type('[Local] ADD SVC'),
  S_EDIT_SVC: type('[Server] EDIT SVC'),
  L_EDIT_SVC: type('[Local] EDIT SVC'),
  S_REM_SVC: type('[Server] REM SVC'),
  L_REM_SVC: type('[Local] REM SVC'),
  SVC_GET_TEMPLATE: type('[Server] SVC GET TEMPLATE'),
  SVC_TYPE_CHANGED: type('[Local] SVC TYPE CHANGED')
};

export class InitAction implements Action {
  type = ActionTypes.INIT;

  constructor(public payload: ObjectId) { }
}

export class LoadDataAction implements Action {
  type = ActionTypes.LOAD_DATA;

  constructor(public payload: any) { }
}

export class AddDeviceAction implements Action {
  type = ActionTypes.ADD_DEVICE;

  constructor(public payload: Device) { }
}

export class SConfirmPairAction implements Action {
  type = ActionTypes.S_CONFIRM_PAIR;

  constructor(public payload: ObjectLink<String>) { }
}

export class LConfirmPairAction implements Action {
  type = ActionTypes.L_CONFIRM_PAIR;

  constructor(public payload: String) { }
}

export class SDepairDeviceAction implements Action {
  type = ActionTypes.S_DEPAIR_DEVICE;

  constructor(public payload: ObjectLink<String>) { }
}

export class LDepairDeviceAction implements Action {
  type = ActionTypes.L_DEPAIR_DEVICE;

  constructor(public payload: String) { }
}

export class SAddMirrorAction implements Action {
  type = ActionTypes.S_ADD_MIRROR;

  constructor(public payload: ObjectLink<Mirror>) { }
}

export class LAddMirrorAction implements Action {
  type = ActionTypes.L_ADD_MIRROR;

  constructor(public payload: Mirror) { }
}

export class SEditMirrorAction implements Action {
  type = ActionTypes.S_EDIT_MIRROR;

  constructor(public payload: ObjectLink<Mirror>) { }
}

export class LEditMirrorAction implements Action {
  type = ActionTypes.L_EDIT_MIRROR;

  constructor(public payload: Mirror) { }
}

export class SRemoveMirrorAction implements Action {
  type = ActionTypes.S_REM_MIRROR;

  constructor(public payload: ObjectLink<String>) { }
}

export class LRemoveMirrorAction implements Action {
  type = ActionTypes.L_REM_MIRROR;

  constructor(public payload: String) { }
}

export class SLinkServiceAction implements Action {
  type = ActionTypes.S_LINK_SVC;

  constructor(public payload: ObjectLink<ObjectId>) { }
}

export class LLinkServiceAction implements Action {
  type = ActionTypes.L_LINK_SVC;

  constructor(public payload: ObjectLink<ObjectId>) { }
}

export class SUnlinkServiceAction implements Action {
  type = ActionTypes.S_UNLINK_SVC;

  constructor(public payload: ObjectLink<ObjectId>) { }
}

export class LUnlinkServiceAction implements Action {
  type = ActionTypes.L_UNLINK_SVC;

  constructor(public payload: ObjectLink<ObjectId>) { }
}

export class SAddServiceAction implements Action {
  type = ActionTypes.S_ADD_SVC;

  constructor(public payload: ObjectLink<Service>) { }
}

export class LAddServiceAction implements Action {
  type = ActionTypes.L_ADD_SVC;

  constructor(public payload: Service) { }
}

export class SEditServiceAction implements Action {
  type = ActionTypes.S_EDIT_SVC;

  constructor(public payload: ObjectLink<Service>) { }
}

export class LEditServiceAction implements Action {
  type = ActionTypes.L_EDIT_SVC;

  constructor(public payload: Service) { }
}

export class SRemoveServiceAction implements Action {
  type = ActionTypes.S_REM_SVC;

  constructor(public payload: ObjectLink<ObjectId>) { }
}

export class LRemoveServiceAction implements Action {
  type = ActionTypes.L_REM_SVC;

  constructor(public payload: ObjectId) { }
}

export class ServiceGetTemplateAction implements Action {
  type = ActionTypes.SVC_GET_TEMPLATE;

  constructor(public payload: String) { }
}

export class ServiceTypeChangedAction implements Action {
  type = ActionTypes.SVC_TYPE_CHANGED;

  constructor(public payload: ServiceTemplate) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = 
  InitAction |
  LoadDataAction |
  AddDeviceAction |
  SConfirmPairAction |
  LConfirmPairAction |
  SDepairDeviceAction |
  LDepairDeviceAction |
  SAddMirrorAction |
  LAddMirrorAction |
  SEditMirrorAction |
  LEditMirrorAction |
  SRemoveMirrorAction |
  LRemoveMirrorAction |
  SLinkServiceAction |
  LLinkServiceAction | 
  SUnlinkServiceAction |
  LUnlinkServiceAction |
  SAddServiceAction |
  LAddServiceAction |
  SEditServiceAction |
  LEditServiceAction |
  SRemoveServiceAction |
  LRemoveServiceAction |
  ServiceGetTemplateAction |
  ServiceTypeChangedAction;