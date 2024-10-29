using my.todoapp as my from '../db/schema';

service CatalogService @(path:'/browse') {
    @cds.localized: false
    entity Tasks as projection on my.Tasks {*};
}
