import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UserComponent from '../UserComponent.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const stubs = {
  track: jest.fn(),
  windowOpen: jest.fn(),
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

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('should call "init" action', () => {
    /* TODO: user.init action */
    expect(stubs.init).toHaveBeenCalledTimes(1);
  });

  test('should call "checkFavorite" action', () => {
    /* TODO: favorites.checkFavorite action */
    expect(stubs.checkFavorite).toHaveBeenCalledTimes(1);
  });

  test('should call "openUserLink" action', () => {
    /* TODO: logger.openUserLink action */
    expect(stubs.openUserLink).toHaveBeenCalledTimes(1);
  });

  test('should emit "close" event', () => {
    /* TODO: close event */
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
