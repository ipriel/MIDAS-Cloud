import { Action } from '@ngrx/store';
import { type } from '../shared/util';
import { State } from './user.store';

export const ActionTypes = {
  INIT: type('INIT'), //S
  LOAD_DATA: type('LOAD_DATA'), //L
  ADD_DEVICE: type('ADD_DEVICE'), //D
  CONFIRM_PAIR: type('CONFIRM_PAIR'), //L
  DEPAIR_DEVICE: type('DEPAIR_DEVICE'), //L
  ADD_MIRROR: type('ADD_MIRROR'), //L
  EDIT_MIRROR: type('EDIT_MIRROR'), //L
  REM_MIRROR: type('REM_MIRROR'), //L
  LINK_SVC: type('LINK_SVC'), //L
  UNLINK_SVC: type('UNLINK_SVC'), //L
  ADD_SVC: type('ADD_SVC'), //L
  EDIT_SVC: type('EDIT_SVC'), //L
  REM_SVC: type('REM_SVC'), //L
  SVC_GET_TEMPLATE: type('SVC_GET_TEMPLATE'), //S
  SVC_TYPE_CHANGED: type('SVC_TYPE_CHANGED') //L
};

export class InitAction implements Action {
  type = ActionTypes.INIT;

  constructor(public payload: String) { }
}

export class LoadDataAction implements Action {
  type = ActionTypes.LOAD_DATA;

  constructor(public payload: State) { }
}

export class AddDeviceAction implements Action {
  type = ActionTypes.ADD_DEVICE;

  constructor(public payload: Device) { }
}

export class ConfirmPairAction implements Action {
  type = ActionTypes.CONFIRM_PAIR;

  constructor(public payload: any) { }
}

export class DepairDeviceAction implements Action {
  type = ActionTypes.DEPAIR_DEVICE;

  constructor(public payload: any) { }
}

export class AddMirrorAction implements Action {
  type = ActionTypes.ADD_MIRROR;

  constructor(public payload: Mirror) { }
}

export class EditMirrorAction implements Action {
  type = ActionTypes.EDIT_MIRROR;

  constructor(public payload: Mirror) { }
}

export class RemoveMirrorAction implements Action {
  type = ActionTypes.REM_MIRROR;

  constructor(public payload: ObjectId) { }
}

export class LinkServiceAction implements Action {
  type = ActionTypes.LINK_SVC;

  constructor(public payload: ObjectLink) { }
}

export class UnlinkServiceAction implements Action {
  type = ActionTypes.UNLINK_SVC;

  constructor(public payload: ObjectLink) { }
}

export class AddServiceAction implements Action {
  type = ActionTypes.ADD_SVC;

  constructor(public payload: Service) { }
}

export class EditServiceAction implements Action {
  type = ActionTypes.EDIT_SVC;

  constructor(public payload: Service) { }
}

export class RemoveServiceAction implements Action {
  type = ActionTypes.REM_SVC;

  constructor(public payload: ObjectId) { }
}

export class ServiceGetTemplateAction implements Action {
  type = ActionTypes.SVC_GET_TEMPLATE;

  constructor(public payload: String) { }
}

export class ServiceTypeChangedAction implements Action {
  type = ActionTypes.SVC_TYPE_CHANGED;

  constructor(public payload: Array<Setting>) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = 
  InitAction |
  LoadDataAction |
  ConfirmPairAction |
  DepairDeviceAction |
  AddMirrorAction |
  EditMirrorAction |
  RemoveMirrorAction |
  AddServiceAction |
  EditServiceAction |
  RemoveServiceAction |
  ServiceGetTemplateAction |
  ServiceTypeChangedAction;