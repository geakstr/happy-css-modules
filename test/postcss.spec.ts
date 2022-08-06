import { generateLocalTokenNames } from '../src/postcss';
import { createRoot } from './test/util';

test('generateLocalTokenNames', async () => {
  expect(
    await generateLocalTokenNames(
      createRoot(`
      .basic {
        content: "basic";
      }
      .cascading {
        content: "cascading_1";
      }
      .cascading {
        content: "cascading_2";
      }
      .pseudo_class {
        content: "pseudo_class";
      }
      .pseudo_class:hover {
        content: "pseudo_class:hover";
      }
      .pseudo_class:before {
        content: "pseudo_class:before";
      }
      @supports (display: flex) {
        @media screen and (min-width: 900px) {
          .at_rule {
            content: "at_rule";
          }
        }
      }
      .selector_list_1, .selector_list_2 {
        content: "selector_list";
      }
      :local .local_class_name_1 {
        content: "local_class_name_1";
      }
      :local {
        .local_class_name_2 {
          content: "local_class_name_2";
        }
        .local_class_name_3 {
          content: "local_class_name_3";
        }
      }
      :local(.local_class_name_4) {
        content: "local_class_name_4";
      }
      `),
    ),
  ).toStrictEqual([
    'basic',
    'cascading',
    'pseudo_class',
    'at_rule',
    'selector_list_1',
    'selector_list_2',
    'local_class_name_1',
    'local_class_name_2',
    'local_class_name_3',
    'local_class_name_4',
  ]);
});
