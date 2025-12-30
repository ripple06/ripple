import ResultDetail from "@/ui/result/detail";

export default function Page({ params }: { params: { id: string } }) {
    return <ResultDetail params={params} />;
}
