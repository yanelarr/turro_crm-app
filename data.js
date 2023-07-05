
export const menus = [
    {
        id:0,
        text:"Home",
        iconClass:"bi bi-grid",
        path:"/",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:1,
        text:"Users",
        iconClass:"bi bi-person",
        path:"/users/list",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:2,
        text:"Partner",
        iconClass:"bi bi-people",
        path:"/partner/list",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
        id:3,
        text:"Contracts",
        iconClass:"bi bi-file-earmark-medical",
        path:"/contracts/list",
        hasChild:false,
        parent_id:null,
        target:null
    },
    {
      id: 4,
      text: "Invoices",
      iconClass: "bi bi-receipt",
      path: "/billing/list",
      hasChild: false,
      parent_id: null,
      target: null
    },
    {
      id: 5,
      text: "Offers",
      iconClass: "bi bi-briefcase",
      path: "/offers/list",
      hasChild: false,
      parent_id: null,
      target: null
    },
    {
      id: 6,
      text: "Inventario",
      iconClass: "bi bi-bi bi-archive",
      path: "/",
      hasChild: true,
      parent_id: null,
      target: ["Products"]
    },
    {
      id: 7,
      text: "Products",
      iconClass: "bi bi-boxes",
      path: "/products/list",
      hasChild: false,
      parent_id: 6,
      target: null
    },
    {
      id:8,
      text:"Profile",
      iconClass:"bi bi-person",
      path:"/users/profile",
      hasChild:false,
      parent_id:null,
      target:null
    }
];

export const notifications = [
  {
    severity: "warning",
    title: "Lorem Ipsum",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "30 min. ago"
  },
  {
    severity: "danger",
    title: "Atque rerum nesciunt",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "1 hr. ago"
  },
  {
    severity: "success",
    title: "Sit rerum fuga",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "2 hrs. ago"
  },
  {
    severity: "primary",
    title: "Dicta reprehenderit",
    notification: "Quae dolorem earum veritatis oditseno",
    timeElapsed: "4 hrs. ago"
  },
];

export const messages = [
    {
        from: "Maria Hudson",
        message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
        timeElapsed: "4 hrs. ago",
        photo: "/messages-1.jpg"
    },
    {
        from: "Anna Nelson",
        message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
        timeElapsed: "6 hrs. ago",
        photo: "/messages-2.jpg"
    },
    {
        from: "David Muldon",
        message: "Velit asperiores et ducimus soluta repudiandae labore officia est ut...",
        timeElapsed: "8 hrs. ago",
        photo: "/messages-3.jpg"
    }
];

function numFormat(value) {
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return USDollar.format(value);
};

export {numFormat};

function formatNumber(v) {
  v = v.replace(/([^0-9\.]+)/g, '');
  v = v.replace(/^[\.]/, '');
  v = v.replace(/[\.][\.]/g, '');
  v = v.replace(/\.(\d)(\d)(\d)/g, '.$1$2');
  v = v.replace(/\.(\d{1,2})\./g, '.$1');
  v = v.toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,');
  v = v.split('').reverse().join('').replace(/^[\,]/, '');
  return v;
}  

export { formatNumber };
