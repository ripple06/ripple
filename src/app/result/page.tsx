import Result from "@/ui/result";
import { Suspense } from "react";

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Result />
        </Suspense>
    );
}
