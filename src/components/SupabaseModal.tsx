import React, { useState, useEffect } from 'react';
import {
  Database,
  Check,
  Copy,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  X,
  AlertCircle,
  Clock,
  User,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_DEFAULT_URL,
  SUPABASE_SQL_SETUP,
  testSupabaseConnection,
  fetchRecentBookings
} from '../lib/supabase';
import { SupabaseBookingRecord } from '../types';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusResult, setStatusResult] = useState<{
    connected: boolean;
    tableExists: boolean;
    message: string;
  } | null>(null);
  const [bookings, setBookings] = useState<SupabaseBookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'sql' | 'bookings'>('status');

  const checkConnection = async () => {
    setTesting(true);
    const res = await testSupabaseConnection();
    setStatusResult(res);
    setTesting(false);
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    const res = await fetchRecentBookings();
    setBookings(res.bookings);
    setLoadingBookings(false);
  };

  useEffect(() => {
    if (isOpen) {
      checkConnection();
      loadBookings();
    }
  }, [isOpen]);

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0D131B] border border-emerald-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">
                  Supabase Database Integration
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Project ID: <span className="text-slate-200 font-mono">{SUPABASE_PROJECT_ID}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-white/[0.01] px-6">
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'status'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Connection Status
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'sql'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SQL Table Setup
          </button>
          <button
            onClick={() => {
              setActiveTab('bookings');
              loadBookings();
            }}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'bookings'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Saved Appointments ({bookings.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'status' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Endpoint</span>
                  <span className="text-xs font-mono text-emerald-400 truncate max-w-xs sm:max-w-md">
                    {SUPABASE_DEFAULT_URL}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Project ID</span>
                  <span className="text-xs font-mono text-white bg-white/[0.06] px-2 py-1 rounded">
                    {SUPABASE_PROJECT_ID}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Authentication</span>
                  <span className="text-xs text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Publishable Key Connected
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border ${
                  statusResult?.tableExists
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {statusResult?.tableExists ? (
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold text-white">
                      {statusResult?.tableExists
                        ? 'Connected & Ready for Bookings'
                        : 'Supabase Connected (Table Setup Recommended)'}
                    </h4>
                    <p className="text-xs mt-1 text-slate-300 leading-relaxed">
                      {statusResult?.message ||
                        'Checking live connection to Supabase database...'}
                    </p>
                    {!statusResult?.tableExists && (
                      <button
                        onClick={() => setActiveTab('sql')}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 underline underline-offset-4 hover:text-amber-200"
                      >
                        View 1-Click SQL Setup Script &rarr;
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={checkConnection}
                  disabled={testing}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                  <span>{testing ? 'Checking Connection...' : 'Test Connection'}</span>
                </button>

                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-xs border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Supabase Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                💡 <strong>Quick Setup:</strong> Open your{' '}
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-bold text-white hover:text-emerald-200"
                >
                  Supabase SQL Editor
                </a>
                , paste the SQL below, and click <strong>Run</strong>. This creates the <code className="text-white bg-black/40 px-1 py-0.5 rounded font-mono">public.bookings</code> table with public insert access.
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-slate-300 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed">
                  {SUPABASE_SQL_SETUP}
                </pre>
                <button
                  onClick={copySql}
                  className="absolute top-3 right-3 py-1.5 px-3 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 shadow transition-colors flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-slate-400">
                  Showing recent customer appointment bookings
                </span>
                <button
                  onClick={loadBookings}
                  disabled={loadingBookings}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${loadingBookings ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/10 text-slate-400 text-xs space-y-2">
                  <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                  <p>No appointment bookings recorded yet.</p>
                  <p className="text-slate-500">
                    When visitors submit the booking form, their requests will appear here and in your Supabase database!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {bookings.map((b, idx) => (
                    <div
                      key={b.id || idx}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-white">
                          <User className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{b.full_name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {b.created_at ? new Date(b.created_at).toLocaleString() : 'Recent'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{b.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{b.email}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.06] text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
                          {b.service}
                        </span>
                        <span className="text-slate-400">• {b.package_tier}</span>
                        {b.budget && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-medium border border-emerald-500/20">
                            Budget: {b.budget}
                          </span>
                        )}
                      </div>

                      {b.message && (
                        <p className="text-slate-400 italic pt-1 text-[11px] line-clamp-2">
                          "{b.message}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Growzen Agency × Supabase Cloud Storage
          </span>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
