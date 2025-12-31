import { Suspense } from "react";
import Recommand from "@/ui/recommand";

export default function RecommandPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Recommand />
        </Suspense>
    );
}