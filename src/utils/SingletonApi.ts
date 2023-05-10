export default class SingletonApi<D> {
  private isFetching: boolean = false;

  public async call(fun: () => Promise<D>) {
    try {
      if (!this.isFetching) {
        this.isFetching = true;
        const data = await fun();
        this.isFetching = false;
        return data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
