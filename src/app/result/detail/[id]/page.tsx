import ResultDetail from "@/ui/result/detail";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultDetail params={params} />
        </Suspense>
    );
}
