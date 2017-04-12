import '@ngrx/core/src/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Actions, ActionTypes } from './user.actions';
import { safeAction } from '../shared/util';


export interface State {
  _id: ObjectId;
  name: String;
  mirrors: Array<Mirror>;
  devices: Array<Device>;
  services: Array<Service>;
  serviceTypes: Array<String>;
  serviceTemplate: ServiceTemplate;
};

const initialState: State = {
  _id: null,
  name: "",
  mirrors: [],
  devices: [],
  services: [],
  serviceTypes: [],
  serviceTemplate: null
};

export function userReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_DATA: {
      return safeAction(action, state, (payload, state) => {
        state._id = payload._id;
        state.name = payload.name;
        state.mirrors = payload.mirrors;
        state.devices = payload.devices;
        state.services = payload.services;
        return state;
      });
    }

    case ActionTypes.ADD_DEVICE: {
      return safeAction(action, state, (payload, state) => {
        state.devices.push(payload);
        return state;
      });
    }

    case ActionTypes.L_CONFIRM_PAIR: {
      return safeAction(action, state, (payload: String, state) => {
        let index = state.devices.findIndex(device => device.mac === payload);
        state.devices[index].paired = true;
        return state;
      });
    }

    case ActionTypes.L_DEPAIR_DEVICE: {
      return safeAction(action, state, (payload: String, state) => {
        let index = state.devices.findIndex(device => device.mac === payload);
        state.devices.splice(index, 1);
        return state;
      });
    }

    case ActionTypes.L_ADD_MIRROR: {
      return safeAction(action, state, (payload: Mirror, state) => {
        state.mirrors.push(payload);
        return state;
      });
    }

    case ActionTypes.L_EDIT_MIRROR: {
      return safeAction(action, state, (payload: Mirror, state) => {
        let index = state.mirrors.findIndex(mirror => mirror.sn === payload.sn);
        state.mirrors[index] = Object.assign({}, payload);
        return state;
      });
    }

    case ActionTypes.L_REM_MIRROR: {
      return safeAction(action, state, (payload: String, state) => {
        let index = state.mirrors.findIndex(mirror => mirror.sn === payload);
        state.mirrors.splice(index, 1);
        return state;
      });
    }

    case ActionTypes.L_LINK_SVC: {
      return safeAction(action, state, (payload: ObjectLink<ObjectId>, state) => {
        let index = state.mirrors.findIndex(mirror => mirror.sn === payload.parentId);
        state.mirrors[index].services.push(payload.child);
        return state;
      });
    }

    case ActionTypes.L_UNLINK_SVC: {
      return safeAction(action, state, (payload: ObjectLink<ObjectId>, state) => {
        let devIndex = state.mirrors.findIndex(mirror => mirror.sn === payload.parentId);
        let svcIndex = state.mirrors[devIndex].services.findIndex(serviceId => serviceId === payload.child);
        state.mirrors[devIndex].services.splice(svcIndex, 1);
        return state;
      });
    }

    case ActionTypes.L_ADD_SVC: {
      return safeAction(action, state, (payload: Service, state) => {
        state.services.push(payload);
        return state;
      });
    }

    case ActionTypes.L_EDIT_SVC: {
      return safeAction(action, state, (payload: Service, state) => {
        let index = state.services.findIndex(service => service._id === payload._id);
        state.services[index] = payload;
        return state;
      });
    }

    case ActionTypes.L_REM_SVC: {
      return safeAction(action, state, (payload: ObjectId, state) => {
        // Remove from user.services
        let index = state.services.findIndex(service => service._id === payload);
        state.services.splice(index, 1);
        
        // Unlink from mirror.services
        state.mirrors.forEach(mirror => {
          let svcIndex = mirror.services.indexOf(serviceId => serviceId === payload);
          if (typeof svcIndex !== "undefined")
            mirror.services.splice(svcIndex, 1);
        });
        return state;
      });
    }

    case ActionTypes.SVC_TYPE_CHANGED: {
      return safeAction(action, state, (payload: ServiceTemplate, state) => {
        state.serviceTemplate = payload;
        return state;
      });
    }

    default: {
      return state;
    }
  }
}