import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Landmark,
  FileCheck2,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Info,
  ShieldCheck,
  Building,
  Scale
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";

export function FinanceReadiness() {
  const {
    selectedFarm,
    documents,
    addDocument,
    deleteDocument
  } = useApp();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [docFormData, setDocFormData] = useState({
    name: "",
    type: "Soil Health Card",
    fileSize: "1.5 MB",
    notes: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const farmDocs = documents.filter(d => d.farmId === selectedFarm?.id);

  // Defined checklist items for documentation readiness
  const checklist = [
    { title: "Standard Digital Farm Profile", description: "Structured landholding details and georeferenced coordinates.", verified: true },
    { title: "Soil Health Laboratory Card", description: "Physicochemical soil test or electrochemical NPK sensor baseline.", verified: farmDocs.some(d => d.type.includes("Soil")) },
    { title: "Land Title / Revenue Record (Patta/Chitta)", description: "Farmer-declared title extract or village adangal record.", verified: farmDocs.some(d => d.type.includes("Land")) },
    { title: "FPO Shareholder Membership", description: "Registered active member of a recognized Farmer Producer Org.", verified: farmDocs.some(d => d.type.includes("FPO")) },
    { title: "Irrigation Telemetry & AWD Records", description: "Timestamped logs of water conservation and drip operation.", verified: true },
    { title: "Consent Governance Form", description: "Signed digital data authorization token for credit evaluation.", verified: true }
  ];

  const completedCount = checklist.filter(c => c.verified).length;
  const documentationCompletenessScore = Math.round((completedCount / checklist.length) * 100);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File exceeds 10MB maximum size limit.");
      return;
    }

    // Validate type (PDF, PNG, JPG, CSV)
    const allowed = ["application/pdf", "image/png", "image/jpeg", "text/csv"];
    if (!allowed.includes(file.type) && !file.name.endsWith(".csv")) {
      setFileError("Only PDF, PNG, JPG, and CSV document formats are accepted.");
      return;
    }

    setSelectedFile(file);
    setDocFormData(prev => ({
      ...prev,
      name: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!docFormData.name) return;

    await addDocument({
      farmId: selectedFarm?.id,
      ...docFormData
    });

    setIsUploadModalOpen(false);
    setDocFormData({
      name: "",
      type: "Soil Health Card",
      fileSize: "1.5 MB",
      notes: ""
    });
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Documents
            </h1>
            <Badge variant="outline">Credit paperwork</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            A checklist of papers a branch or FPO typically asks for. Completeness is not a credit score.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-primary self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Supporting Document</span>
        </button>
      </div>

      {/* Institutional Assessment Disclaimer Notice */}
      <div className="bg-ivory p-4 rounded-2xl border border-slate-border flex items-start gap-3 text-xs text-slate-muted">
        <Scale className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-charcoal">Banking & Financial Independence Notice:</strong>
          <p className="leading-relaxed">
            The documentation score below measures <strong>information completeness</strong>, not creditworthiness or underwriting score. AGRINOVA does not calculate credit scores or promise loan, insurance, or subsidy approvals. Financial institutions, banks (such as NABARD, SBI, or regional rural banks), and FPOs make their own independent appraisals according to their regulatory policies.
          </p>
        </div>
      </div>

      {/* Documentation Readiness Gauge Card */}
      <div className="panel p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 bg-ivory p-6 rounded-2xl border border-slate-200/80 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">
            Documentation Completeness
          </span>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="text-5xl font-semibold text-forest">{documentationCompletenessScore}</span>
            <span className="text-xl font-bold text-slate-muted">%</span>
          </div>
          <Badge variant={documentationCompletenessScore >= 80 ? "agri" : "warning"} size="sm" className="mt-2">
            {documentationCompletenessScore >= 80 ? "Institutional Dossier Prepared" : "Partial Dossier"}
          </Badge>
          <p className="text-[11px] text-slate-500 mt-2">
            {completedCount} of {checklist.length} core documentation dimensions fulfilled.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3">
          <h3 className="text-sm font-bold text-charcoal">
            Farm Credit Documentation Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                  item.verified
                    ? "bg-emerald-50/50 border-emerald-200 text-charcoal"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                {item.verified ? (
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-[11px] opacity-80 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <FileText className="w-4 h-4 text-forest" />
              <span>Attached Document Records for {selectedFarm?.name}</span>
            </h3>
            <p className="text-xs text-slate-muted">Securely archived farmer records and third-party laboratory assays</p>
          </div>
          <Badge variant="lime" size="xs">{farmDocs.length} Documents</Badge>
        </div>

        {farmDocs.length === 0 ? (
          <div className="p-8 text-center text-slate-muted text-xs">
            No documents attached yet. Click "Upload Supporting Document" to attach revenue records or soil lab assays.
          </div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ivory border-b border-slate-100 text-slate-muted font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Document Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Verification Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {farmDocs.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-charcoal flex items-center gap-2">
                      <FileText className="w-4 h-4 text-forest flex-shrink-0" />
                      <span>{doc.name}</span>
                    </td>
                    <td className="py-3 px-3">{doc.type}</td>
                    <td className="py-3 px-3 font-mono">{doc.fileSize}</td>
                    <td className="py-3 px-3 text-slate-muted">{doc.uploadDate}</td>
                    <td className="py-3 px-3">
                      <Badge variant={doc.status.includes("Verified") ? "agri" : "warning"} size="xs">
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-danger hover:bg-rose-50 transition-colors"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Supporting Farm Documentation"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Document Category
            </label>
            <select
              value={docFormData.type}
              onChange={(e) => setDocFormData({ ...docFormData, type: e.target.value })}
              className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            >
              <option value="Soil Health Card">Soil Health Laboratory Card</option>
              <option value="Land Ownership Record">Land Title / Patta Extract</option>
              <option value="FPO Shareholder Proof">FPO Shareholder Certificate</option>
              <option value="Water Source Authorization">Irrigation Sluice / Borewell Record</option>
              <option value="Seed / Input Purchase Invoice">Certified Seed Purchase Invoice</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Select Document File (PDF, PNG, JPG, CSV up to 10MB)
            </label>
            <input
              type="file"
              required
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.csv"
              className="w-full bg-ivory text-charcoal text-xs px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
            />
            {fileError && (
              <p className="text-danger mt-1 text-[11px] font-semibold">{fileError}</p>
            )}
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Document Display Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 2026_Soil_Lab_Assay_Report.pdf"
              value={docFormData.name}
              onChange={(e) => setDocFormData({ ...docFormData, name: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Notes / Issuing Authority
            </label>
            <input
              type="text"
              placeholder="e.g. Tamil Nadu Agricultural University Lab Test"
              value={docFormData.notes}
              onChange={(e) => setDocFormData({ ...docFormData, notes: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
            >
              Upload Document
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
