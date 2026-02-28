import {
  LOGGER_KEY,
  VUE3_CLASS_COMPONENT_DECORATORS_KEY,
} from '../../src/impl/metadata-keys';

describe('metadata-keys', () => {
  it('should export correct LOGGER_KEY', () => {
    expect(LOGGER_KEY).toBe('__common_logging_logger__');
  });

  it('should export correct VUE3_CLASS_COMPONENT_DECORATORS_KEY', () => {
    expect(VUE3_CLASS_COMPONENT_DECORATORS_KEY).toBe('__vue3_class_component_decorators__');
  });
});
