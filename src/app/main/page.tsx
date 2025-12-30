import Main from "@/ui/main";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Main />
        </Suspense>
    );
}
