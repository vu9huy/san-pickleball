// hàm này sẽ gửi thông tin tất cả các lỗi của hàm được bọc về phía client, nếu không bọc controller trong hàm này thì client sẽ không phận được lỗi bên server (bên server vẫn hiện lỗi)
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;