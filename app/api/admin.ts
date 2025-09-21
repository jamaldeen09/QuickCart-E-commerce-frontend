import { ConfiguredProduct } from './../redux/data/productSlice';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DashboardPayload } from "../../../server/src/types/authTypes";
import { axiosHandlers } from "../config/axiosConfig";
import { callToast } from "../utils/authHandlers";
import { Actiontype } from "../types/generalTypes";


export class AdminSystem {
    router: AppRouterInstance
    constructor(router: AppRouterInstance) {
        this.router = router
    }

    async fetchDashboardData(
        handleFetch: (state: boolean) => void,
        getDashboardData: (data: DashboardPayload) => void,
    ) {
        try {
            handleFetch(true);
            const response = await axiosHandlers.axios.get("/api/admin/dashboard-data");
            getDashboardData(response.data.data);
            handleFetch(false);
        } catch (err: unknown) {
            handleFetch(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(err);
                this.router.push("/");
                if (err.response?.data.message) {
                    callToast("error", err.response?.data.message)
                } else { return }
            } else {
                console.error(`Failed to fetch dashboard data: ${err}`);
                callToast("error", "Server error: failed to fetch dashboard data")
            }
        }
    }

    async createProduct(
        data: FormData,
        newProduct: (product: ConfiguredProduct) => void,
        setIsCreating: Actiontype<boolean>,
        refreshForm: () => void,
    ) {
        try {
            setIsCreating(true);
            const response = await axiosHandlers.axios.post("/api/admin/create-product", data);
            newProduct(response.data.data.createdProduct);
            callToast("success", response.data.message)
            setIsCreating(false);
            refreshForm();
        } catch (err: unknown) {
            setIsCreating(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(err)

                if (err.response?.status === 401 || err.response?.status === 403 || err.response?.status === 400) {
                    this.router.push("/");
                    if (err.response?.data.message) {
                        callToast("error", err.response?.data.message)
                    } else { return; }
                    return;
                }

            } else {
                console.error(`Failed to create product: ${err}`)
                callToast("error", "Failed to create product")
            }
        }
    }

    async deleteProduct(
        id: string,
        setIsDeleting: Actiontype<boolean>,
        updateProducts: (
            data: ConfiguredProduct[]
        ) => void,
    ) {
        try {
            setIsDeleting(true);
            const response = await axiosHandlers.axios.delete(`/api/admin/delete-product/${id}`);
            setIsDeleting(false);
            updateProducts(response.data.data.updatedProducts)
        } catch (err: unknown) {
            setIsDeleting(false);
            if (err instanceof axiosHandlers.axiosError) {
                console.error(err)
                if (err.response?.status === 401 || err.response?.status === 403 || err.response?.status === 400) {
                    this.router.push("/");
                    if (err.response?.data.message) {
                        callToast("error", err.response?.data.message)
                    } else { return; }
                    return;
                }

            } else {
                console.error(`Failed to delete product: ${err}`)
                callToast("error", "Failed to delete product")
            }
        }
    }
}