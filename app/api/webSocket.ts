"use client"
import { ProfilePayload } from "../../../server/src/types/authTypes";
import { socket } from "../config/socketConfig";
import { ConfiguredProduct } from "../redux/data/productSlice";
import { ConfiguredProfilePayload } from "../redux/data/profileSlice";
import { formatDate } from "../utils/generalHelpers";


export class WebSocketClient {
    private static profileListener?: (payload: { profile: ProfilePayload }) => void;

    static receiveProfileInformation(
        extractProfile: (data: ConfiguredProfilePayload) => void,
        fetching: (state: boolean) => void,
    ) {

        if (!this.profileListener) {
            fetching(true);
            this.profileListener = ({ profile }: { profile: ProfilePayload }) => {
                const configuredPayload: ConfiguredProfilePayload = {
                    _id: profile._id,
                    status: profile.status,
                    cart: profile.cart,
                    avatar: profile.avatar,
                    email: profile.email,
                    fullname: profile.fullname,
                    createdAt: formatDate(profile.createdAt),
                    updatedAt: formatDate(profile.updatedAt),
                    role: profile.role,
                    likedProducts: profile.likedProducts.map((product) => {
                        return { ...product, createdAt: formatDate(product?.createdAt) || "", updatedAt: formatDate(product?.updatedAt)  || ""}
                    }),
                    savedAddresses: profile.savedAddresses,
                    connectedAccounts: profile.connectedAccounts,
                    orders: profile?.orders.map((order) => ({
                        ...order,
                        items: order.items.map((item) => ({
                            ...item,
                            product: {
                                ...item.product,
                                createdAt: formatDate(item.product?.createdAt) || "",
                                updatedAt: formatDate(item.product?.updatedAt) || ""
                            } as ConfiguredProduct
                        })),
                        createdAt: formatDate(order.createdAt),
                        updatedAt: formatDate(order.updatedAt)
                    })) || []
                }
                extractProfile(configuredPayload);
            };
            socket.on("profile", this.profileListener);
        }

        return () => {
            if (this.profileListener) {
                socket.off("profile", this.profileListener);
                this.profileListener = undefined;
            }
        };
    }
}
