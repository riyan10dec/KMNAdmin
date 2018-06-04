import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'nb-home',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/home',
    home: true,
    children: [
      {
        title: 'Sliders',
        link: '/pages/home/sliders',
      },
      {
        title: 'Tentang Kami',
        link: '/pages/home/tentangkami',
      },
      {
        title: 'Suku Bunga',
        link: '/pages/home/sukubunga',
      },
      {
        title: 'Group',
        link: '/pages/home/group',
      },
      // {
      //   title: 'Grid',
      //   link: '/pages/ui-features/grid',
      // },
      // {
      //   title: 'Icons',
      //   link: '/pages/ui-features/icons',
      // },
      // {
      //   title: 'Modals',
      //   link: '/pages/ui-features/modals',
      // },
      // {
      //   title: 'Popovers',
      //   link: '/pages/ui-features/popovers',
      // },
      // {
      //   title: 'Typography',
      //   link: '/pages/ui-features/typography',
      // },
      // {
      //   title: 'Animated Searches',
      //   link: '/pages/ui-features/search-fields',
      // },
      // {
      //   title: 'Tabs',
      //   link: '/pages/ui-features/tabs',
      // },
    ],
  },
  {
    title: 'Tentang Kami',
    icon: 'nb-person',
    link: '/pages/aboutus',
    children: [
      {
        title: 'Dasar Hukum',
        link: '/pages/aboutus/dasarhukum',
      },
      {
        title: 'Kata Pengantar',
        link: '/pages/aboutus/katapengantar',
      },
      {
        title: 'Visi & Misi',
        link: '/pages/aboutus/visimisi',
      },
      {
        title: 'Team',
        link: '/pages/aboutus/team',
      },
    ],
  },
  {
    title: 'Produk',
    icon: 'nb-star',
    link: '/pages/produk',
    children: [
      {
        title: 'Simpanan',
        link: '/pages/produk/simpanan',
      },
      {
        title: 'Pinjaman',
        link: '/pages/produk/pinjaman',
      },
    ],
  },
  {
    title: 'News',
    icon: 'nb-title',
    link: '/pages/news-event',
  },
  {
    title: 'Annual Report',
    icon: 'nb-bar-chart',
    link: '/pages/annual',
  },
  {
    title: 'Footer',
    icon: 'nb-compose',
    link: '/pages/footer',
  },
  
  // {
  //   title: 'Forms',
  //   icon: 'nb-compose',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/pages/forms/inputs',
  //     },
  //     {
  //       title: 'Form Layouts',
  //       link: '/pages/forms/layouts',
  //     },
  //   ],
  // },
  // {
  //   title: 'Components',
  //   icon: 'nb-gear',
  //   children: [
  //     {
  //       title: 'Tree',
  //       link: '/pages/components/tree',
  //     }, {
  //       title: 'Notifications',
  //       link: '/pages/components/notifications',
  //     },
  //   ],
  // },
  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //     {
  //       title: 'Search Maps',
  //       link: '/pages/maps/searchmap',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'nb-bar-chart',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/pages/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/pages/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/pages/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'nb-title',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
  {
    title: 'Logout',
    icon: 'nb-locked',
    link: '/auth/logout',
  },
];
