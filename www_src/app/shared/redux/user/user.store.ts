import '@ngrx/core/src/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Actions, ActionTypes } from './user.actions';
import { safeAction } from '../shared/util';


export interface State {
  mirrors: Array<Mirror>;
  devices: Array<Device>;
  services: Array<Service>;
  serviceTypes: Array<String>;
  serviceTemplate: Array<Setting>;
};

const initialState: State = {
  mirrors: [],
  devices: [],
  services: [],
  serviceTypes: [],
  serviceTemplate: []
};

export function userReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_DATA: {
      return safeAction(action, state, (payload, state) => {
        return payload;
      });
    }

    case ActionTypes.ADD_DEVICE: {
      return safeAction(action, state, (payload, state) => {
        state.devices.push(payload);
        return state;
      });
    }

    case ActionTypes.CONFIRM_PAIR: {
      return safeAction(action, state, (payload, state) => {
        let index = state.devices.findIndex(device => device._id === payload);
        state.devices[index].paired = true;
        return state;
      });
    }

    case ActionTypes.DEPAIR_DEVICE: {
      return safeAction(action, state, (payload, state) => {
        let index = state.devices.findIndex(device => device._id === payload);
        state.devices.splice(index, 1);
        return state;
      });
    }

    case ActionTypes.ADD_MIRROR: {
      return safeAction(action, state, (payload, state) => {
        state.mirrors.push(payload);
        return state;
      });
    }

    case ActionTypes.EDIT_MIRROR: {
      return safeAction(action, state, (payload, state) => {
        let index = state.mirrors.findIndex(mirror => mirror._id === payload._id);
        state.mirrors[index] = payload;
        return state;
      });
    }

    case ActionTypes.REM_MIRROR: {
      return safeAction(action, state, (payload, state) => {
        let index = state.mirrors.findIndex(mirror => mirror._id === payload);
        state.mirrors.splice(index, 1);
        return state;
      });
    }

    case ActionTypes.ADD_SVC: {
      return safeAction(action, state, (payload, state) => {
        state.services.push(payload);
        return state;
      });
    }

    case ActionTypes.EDIT_SVC: {
      return safeAction(action, state, (payload, state) => {
        let index = state.services.findIndex(service => service._id === payload._id);
        state.services[index] = payload;
        return state;
      });
    }

    case ActionTypes.REM_SVC: {
      return safeAction(action, state, (payload, state) => {
        let index = state.services.findIndex(service => service._id === payload);
        state.services.splice(index, 1);
        return state;
      });
    }

    case ActionTypes.SVC_TYPE_CHANGED: {
      return safeAction(action, state, (payload, state) => {
        state.serviceTemplate = payload;
        return state;
      });
    }

    default: {
      return state;
    }
  }
}