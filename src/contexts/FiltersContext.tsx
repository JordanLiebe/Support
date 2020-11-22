import React from 'react';

const FilterContext = React.createContext({
  subject: '',
  setSubject: (subject: string) => {},
  priority: '',
  setPriority: (priority: string) => {},
  category: '',
  setCategory: (category: string) => {},
  department: '',
  setDepartment: (department: string) => {},
  status: '',
  setStatus: (status: string) => {},
  author: '',
  setAuthor: (author: string) => {},
  created: new Date(),
  setCreated: (created: Date) => {},
  assignee: '',
  setAssignee: (assignee: string) => {},
  assigned: new Date(),
  setAssigned: (assigned: Date) => {},
});

export default FilterContext;
