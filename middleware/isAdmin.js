const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            message: "Akses Ditolak! Anda tidak memiliki izin admin untuk tindakan ini.",
        });
    }
};

module.exports = isAdmin;
