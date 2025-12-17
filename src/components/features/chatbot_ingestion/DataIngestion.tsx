import { Badge } from "@/components/ui/badge";
import { useIngestion } from "@/hooks/useIngestion";
import { useState } from "react";

export const DataIngestion = () => {
    const [isLoading, setLoading] = useState(false);
    const { ingestionStatus, isLoadingIngestionStatus, ingestData } = useIngestion();

    const handleStartIngestion = async () => {
        ingestData.mutate();
        // console.log("Token:", import.meta.env.VITE_ADMIN_INTERNAL_INGESTION_SECRET_KEY);
    }

    if (ingestionStatus?.state === 'running') {
        setLoading(true);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Data Ingestion</h1>
            <p>Data ingestion feature coming soon...</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={handleStartIngestion}
            >
                Start Ingestion
            </button>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Ingestion Status</h2>
                <div>
                    <Badge>
                        {ingestionStatus?.state || 'No status available'}
                    </Badge>
                </div>
            </div>
        </div>
    );
};