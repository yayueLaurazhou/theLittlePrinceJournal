const initialTags = [
  {
  num: 1,
  name: 'goals',
},
{
  num: 1,
  name: 'health',
},
{
  num: 1,
  name: 'design',
},
{
  num: 2,
  name: 'development',
},
{
  num: 1,
  name: 'personal',
},
{
  num: 1,
  name: 'recipes',
}]

  const initialFolders = [
    {
      name: 'folder1',
      notes:  [{
        id: 'fiomfi12300495',
        title:
          'How Strings are Indexed',
        body: "String are very very important",  
        created: '2019-10-14T17:01:39-05:00',
        tags: ['personal', 'goals'],
        pinned: false
      },
      {
        id: '7dfheir39009443',
        title:
          "Writing a Simple MVC App in Plain JavaScript",
        body: "MVC is a structure used to...",
        created: '2019-10-14T17:01:39-05:00',
        tags: ['development', 'design'],
        pinned: false,
      },
      {
        id: 'ffij39034ikcoei',
        title:
          "I wanted to create and host a Node server",
        body: "This is a project I have been thinking for a long time",
        created: '2019-10-14T17:00:31-05:00',
        tags : ['development'],
        pinned: true,
      },
      {
        id: '3j4o3m00kfmr3okl',
        title:
          "How to create a crepe?",
        body: "This is a recipe from BBC chanel",
        created: '2019-10-14T17:00:31-05:00',
        tags : ['recipes', 'health'],
        pinned: false,
      }],
      tags: [{
        num: 1,
        name: 'goals',
      },
      {
        num: 1,
        name: 'health',
      },
      {
        num: 1,
        name: 'design',
      },
      {
        num: 2,
        name: 'development',
      },
      {
        num: 1,
        name: 'personal',
      },
      {
        num: 1,
        name: 'recipes',
      }], 
    },
    {
      name: 'folder2',
      notes: [],
      tags: []
    },
    {
      name: 'folder3',
      notes: [],
      tags: []
    },
  ]
  
  const initialNotes = [
      {
        id: '1',
        title:
          'How Strings are Indexed',
        body: "String are very very important",  
        created: '2019-10-14T17:01:39-05:00',
        tags: ['personal', 'goals'],
        pinned: false
      },
      {
        id: '2',
        title:
          "Writing a Simple MVC App in Plain JavaScript",
        body: "MVC is a structure used to...",
        created: '2019-10-14T17:01:39-05:00',
        tags: ['development', 'design'],
        pinned: false,
      },
      {
        id: '3',
        title:
          "I wanted to create and host a Node server",
        body: "This is a project I have been thinking for a long time",
        created: '2019-10-14T17:00:31-05:00',
        tags : ['development'],
        pinned: true,
      },
      {
        id: '4',
        title:
          "How to create a crepe?",
        body: "This is a recipe from BBC chanel",
        created: '2019-10-14T17:00:31-05:00',
        tags : ['recipes', 'health'],
        pinned: false,
      }
  ] 

  export {initialNotes}
  export {initialTags}
  export {initialFolders}