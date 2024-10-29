namespace my.todoapp;

entity Tasks {
  key id : Integer;
  title  : String;
  description  : String;
  duedate: Date;
  status: Boolean;
}
