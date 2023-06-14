import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UserComponent from '../UserComponent.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const stubs = {
  track: jest.fn(),
  windowOpen: jest.fn(),
  init: jest.fn(),
  checkFavorite: jest.fn(),
  openUserLink: jest.fn(),
};

window.open = stubs.windowOpen;

const getHttpMock = () =>
  jest.fn(()  => {
    return {
      url: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

const getStore = (args) =>
  new Vuex.Store({
    modules: {
      user: {
        namespaced: true,
        actions: {
          init: stubs.init,
        },
        state: {
          name: args.name, /* TODO: set field */
          birthDate: args.birthDate, /* TODO: set field */
          description: args.description, /* TODO: set field */
        },
      },
      favorites: {
        namespaced: true,
        actions: {
          checkFavorite: stubs.checkFavorite,
        },
      },
      role: {
        namespaced: true,
        getters: {
          canDisplayUser: () => args.canDisplayUser, /* TODO: set getter response */
        },
      },
      logger: {
        namespaced: true,
        actions: {
          openUserLink: stubs.openUserLink,
        },
        state: {
          enabled: args.enabled, /* TODO: set field */
        },
      },
    },
  });

const mountComponent = (args = {}) =>
  shallowMount(UserComponent, {
    propsData: {
      userId: args.userId, /* TODO: set required property */
      isEnabled: args.isEnabled ?? true,
    },
    provide: {
      utils: {
        isMobile: null, /* TODO: provide property */
        isDesktop: null, /* TODO: provide property */
      },
    },
    mocks: {
      $http: getHttpMock(),
      $tracker: {
        track: stubs.track,
      },
      $route: {
        fullPath: null, /* TODO: mock value */
      },
    },
    localVue,
    store: getStore(args),
  });

/**
 * UserComponent.vue unit tests
 */
describe('UserComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});
