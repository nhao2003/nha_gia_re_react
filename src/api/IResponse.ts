interface IResponse<T> {
    code: number;
    data: T;
}

export default IResponse;