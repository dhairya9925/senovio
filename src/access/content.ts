import type { Access } from "payload";

export const anyone: Access = () => true;

export const authenticated: Access = ({ req: { user } }) => Boolean(user);

export const admins: Access = ({ req: { user } }) => user?.role === "admin";
