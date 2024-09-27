const tags = [
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
      num: 6,
      name: 'personal',
    },
    {
      num: 12,
      name: 'recipes',
    },
  ]

  const categories = [
    {
      id: '1',
      name: 'folder1',
    },
    {
      id: '2',
      name: 'folder2',
    }
  ]
  
  const initialNotes = [
    {
      id: 'e0196fd9-d644-4ca8-aa58-467b8082993e',
      title:
        'How Strings are Indexed',
      body: "String are very very important",  
      tags: ['personal', 'development', 'goals'],
      category: "folder1",
      pinned: false
    },
    {
      id: '6a2923a6-8fed-4277-9286-49125c91d876',
      title:
        "Writing a Simple MVC App in Plain JavaScript",
      body: "MVC is a structure used to...",
      created: '2019-10-14T17:01:39-05:00',
      lastUpdated: '2019-10-14T17:01:49-05:00',
      tags: ['development'],
      category: "folder1",
      pinned: false,
    },
    {
      id: 'a4c5ea72-34ed-496d-aa90-096df7e1ffbd',
      title:
        "I wanted to create and host a Node server",
      body: "This is a project I have been thinking for a long time",
      created: '2019-10-14T17:00:31-05:00',
      lastUpdated: '2019-10-14T17:00:55-05:00',
      tags : ['work'],
      category: 'folder2',
      pinned: true,
    },
    {
      id: 'a4c5ea72-34ed-496d-aa90-096df7e1fe3f3d3',
      title:
        "How to create a crepe?",
      body: "This is a recipe from BBC chanel",
      created: '2019-10-14T17:00:31-05:00',
      lastUpdated: '2019-10-14T17:00:55-05:00',
      tags : ['recipes'],
      category: 'folder2',
      pinned: false,
    },
  ] 

  export {initialNotes}
  export {tags}