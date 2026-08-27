const ok = (res, data, meta = {}) => res.json({ success: true, data, ...meta });
const err = (res, message, status = 400) => res.status(status).json({ success: false, error: message });
const paginate = (res, data, total, page, limit) =>
  res.json({ success: true, data, meta: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total/limit) } });
module.exports = { ok, err, paginate };
