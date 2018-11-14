export class Todo {
  constructor(
    public id: string,
    public task: string,
    public complete: boolean = false
  ) {}
}
