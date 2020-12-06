
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','525'),
  
  routes: [
{
  path: '/docs/api/actions',
  component: ComponentCreator('/docs/api/actions','235'),
  exact: true,
},
{
  path: '/docs/api/bundle',
  component: ComponentCreator('/docs/api/bundle','b98'),
  exact: true,
},
{
  path: '/docs/api/create',
  component: ComponentCreator('/docs/api/create','d95'),
  exact: true,
},
{
  path: '/docs/api/creator-keys',
  component: ComponentCreator('/docs/api/creator-keys','f2f'),
  exact: true,
},
{
  path: '/docs/api/leaf-reducers',
  component: ComponentCreator('/docs/api/leaf-reducers','890'),
  exact: true,
},
{
  path: '/docs/defaults/assign',
  component: ComponentCreator('/docs/defaults/assign','cba'),
  exact: true,
},
{
  path: '/docs/defaults/clear',
  component: ComponentCreator('/docs/defaults/clear','6db'),
  exact: true,
},
{
  path: '/docs/defaults/concat',
  component: ComponentCreator('/docs/defaults/concat','ff8'),
  exact: true,
},
{
  path: '/docs/defaults/do',
  component: ComponentCreator('/docs/defaults/do','de9'),
  exact: true,
},
{
  path: '/docs/defaults/drop',
  component: ComponentCreator('/docs/defaults/drop','d51'),
  exact: true,
},
{
  path: '/docs/defaults/filter',
  component: ComponentCreator('/docs/defaults/filter','87f'),
  exact: true,
},
{
  path: '/docs/defaults/increment',
  component: ComponentCreator('/docs/defaults/increment','1f6'),
  exact: true,
},
{
  path: '/docs/defaults/off',
  component: ComponentCreator('/docs/defaults/off','f80'),
  exact: true,
},
{
  path: '/docs/defaults/on',
  component: ComponentCreator('/docs/defaults/on','411'),
  exact: true,
},
{
  path: '/docs/defaults/overview',
  component: ComponentCreator('/docs/defaults/overview','bc2'),
  exact: true,
},
{
  path: '/docs/defaults/path',
  component: ComponentCreator('/docs/defaults/path','01b'),
  exact: true,
},
{
  path: '/docs/defaults/push',
  component: ComponentCreator('/docs/defaults/push','98b'),
  exact: true,
},
{
  path: '/docs/defaults/pushed-set',
  component: ComponentCreator('/docs/defaults/pushed-set','2ef'),
  exact: true,
},
{
  path: '/docs/defaults/reset',
  component: ComponentCreator('/docs/defaults/reset','109'),
  exact: true,
},
{
  path: '/docs/defaults/set',
  component: ComponentCreator('/docs/defaults/set','3af'),
  exact: true,
},
{
  path: '/docs/defaults/toggle',
  component: ComponentCreator('/docs/defaults/toggle','f4a'),
  exact: true,
},
{
  path: '/docs/defaults/update',
  component: ComponentCreator('/docs/defaults/update','939'),
  exact: true,
},
{
  path: '/docs/examples/advanced-example',
  component: ComponentCreator('/docs/examples/advanced-example','aa5'),
  exact: true,
},
{
  path: '/docs/examples/basic-example',
  component: ComponentCreator('/docs/examples/basic-example','616'),
  exact: true,
},
{
  path: '/docs/examples/intermediate-example',
  component: ComponentCreator('/docs/examples/intermediate-example','553'),
  exact: true,
},
{
  path: '/docs/examples/typescript-example',
  component: ComponentCreator('/docs/examples/typescript-example','240'),
  exact: true,
},
{
  path: '/docs/examples/usereducer-example',
  component: ComponentCreator('/docs/examples/usereducer-example','26b'),
  exact: true,
},
{
  path: '/docs/intro/features',
  component: ComponentCreator('/docs/intro/features','97a'),
  exact: true,
},
{
  path: '/docs/intro/motivation',
  component: ComponentCreator('/docs/intro/motivation','30f'),
  exact: true,
},
{
  path: '/docs/intro/overview',
  component: ComponentCreator('/docs/intro/overview','8cf'),
  exact: true,
},
{
  path: '/docs/riduce',
  component: ComponentCreator('/docs/riduce','07e'),
  exact: true,
},
{
  path: '/docs/typescript/overview',
  component: ComponentCreator('/docs/typescript/overview','9ef'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
