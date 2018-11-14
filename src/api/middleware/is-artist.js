import { ARTIST_ROLE, ADMIN_ROLE } from "../resources/user/user.model";

export const isArtist = (req, res, next) => {
    if(req.user.role !== ARTIST_ROLE){
        return res.json({err: "unauthorized, not an artist"});
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== ADMIN_ROLE) {
        return res.json({ err: "unauthorized, not an admin" });
    }
    next();
};
