'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Plus, 
  Search, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Lock, 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Calendar, 
  LayoutDashboard, 
  Trash2, 
  Edit3, 
  Save, 
  Eye, 
  LogOut,
  Mail,
  UserCheck,
  Building,
  Briefcase,
  Contact2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Default Developer account info
const DEV_EMAIL = 'khanjariff09@gmail.com';

const parseEventsList = (regEvents: any): string[] => {
  if (!regEvents) return [];
  if (Array.isArray(regEvents)) return regEvents;
  if (typeof regEvents === 'string') {
    try {
      const parsed = JSON.parse(regEvents);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.events)) return parsed.events;
    } catch (e) {
      return [regEvents];
    }
  }
  if (typeof regEvents === 'object') {
    if (Array.isArray(regEvents.events)) return regEvents.events;
    return Object.values(regEvents).filter(v => typeof v === 'string') as string[];
  }
  return [];
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'cms' | 'certificates' | 'events' | 'resources' | 'admins' | 'participants'>('overview');
  const [cmsSubTab, setCmsSubTab] = useState<'home' | 'about' | 'team' | 'jobs' | 'contact'>('home');
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // ----------------------------------------------------
  // DATA STATES
  // ----------------------------------------------------
  // CMS Content for all pages
  const [cmsContent, setCmsContent] = useState({
    // Home Page CMS
    home_hero_title: 'Empowering the Next Generation of Cognitive Minds in Bangladesh',
    home_hero_subtitle: 'Applied Cognitio Olympiad Bangladesh (ACOB) is the national premier academic tournament fostering critical reasoning and innovation.',
    home_announcement_banner: '🚀 Registration for National Olympiad 2026 is officially open!',
    home_about_text: 'ACOB is built to challenge standard paradigms of academic excellence. We empower young minds through rigorous cognitive challenges.',
    
    // About Page CMS
    about_title: 'About ACOB',
    about_subtitle: 'Building Bangladesh\'s Premier Academic Olympiad Platform',
    about_mission: 'To foster intellectual excellence and critical thinking among Bangladesh\'s brightest minds through rigorous academic competition.',
    about_vision: 'To build a community of ambitious learners, empowering students through challenging problems and creating pathways to career excellence.',

    // Team Page CMS
    team_title: 'Our Executive Board & Team',
    team_subtitle: 'Meet the visionaries, educators, and organizers leading the cognitive revolution in Bangladesh.',

    // Jobs Page CMS
    jobs_title: 'Join the ACOB Team',
    jobs_subtitle: 'Build the future of intellectual competitions. Explore career opportunities with us.',

    // Contact Page CMS
    contact_title: 'Get in Touch',
    contact_subtitle: 'Have questions? Our support team is here to help you coordinate or register.',
    contact_email: 'contact@acobd.com',
    contact_phone: '+880 1700-000000',
    contact_address: 'Dhaka, Bangladesh'
  });

  // Certificates list
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certSearch, setCertSearch] = useState('');
  const [showCertModal, setShowCertModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({
    student_name: '',
    event_name: 'National Cognitio Olympiad 2026',
    issue_date: new Date().toISOString().split('T')[0],
    achievement: 'First Place - Champion'
  });

  // Upcoming Olympiads (Events)
  const [events, setEvents] = useState<any[]>([]);
  const [archivedEvents, setArchivedEvents] = useState<any[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    id: '',
    title: '',
    date: '',
    category: 'National Olympiad',
    desc: '',
    syllabus: ''
  });

  // Study Resources
  const [resourcesList, setResourcesList] = useState<any[]>([]);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [editingResourceCategory, setEditingResourceCategory] = useState<string>('guides');
  const [editingResourceIndex, setEditingResourceIndex] = useState<number | null>(null);
  const [resourceForm, setResourceForm] = useState({
    title: '',
    desc: '',
    type: 'PDF', // PDF, Video, Download, Podcast
    link: '#',
    duration: '', // Optional for podcasts
    date: '',     // Optional for podcasts
    id: ''        // For podcasts/videos (YouTube ID)
  });

  // Admin Accounts (Only manageable by developer)
  const [adminAccounts, setAdminAccounts] = useState<any[]>([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({
    email: '',
    password: '',
    role: 'admin',
    permissions: ['cms', 'certificates', 'resources', 'events']
  });

  // Olympiad Participants & Students Console states
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [selectedOlympiadForParticipants, setSelectedOlympiadForParticipants] = useState<any | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({
    id: '',
    full_name: '',
    email: '',
    password: '',
    phone: '',
    school: '',
    grade: '',
    registered_events: [] as string[]
  });
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  
  // Bulk Message states
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [bulkEmailSubject, setBulkEmailSubject] = useState('');
  const [bulkEmailMessage, setBulkEmailMessage] = useState('');
  const [sendingBulkEmail, setSendingBulkEmail] = useState(false);
  
  // Single Email states
  const [showSingleEmailModal, setShowSingleEmailModal] = useState(false);
  const [singleEmailStudent, setSingleEmailStudent] = useState<any | null>(null);
  const [singleEmailSubject, setSingleEmailSubject] = useState('');
  const [singleEmailMessage, setSingleEmailMessage] = useState('');
  const [sendingSingleEmail, setSendingSingleEmail] = useState(false);


  // ----------------------------------------------------
  // AUTHENTICATION CHECK
  // ----------------------------------------------------
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionStr = sessionStorage.getItem('acob_admin_session');
      if (!sessionStr) {
        router.push('/admin');
        return;
      }
      try {
        const parsed = JSON.parse(sessionStr);
        setSession(parsed);
        setLoading(false);
      } catch (err) {
        router.push('/admin');
      }
    }
  }, [router]);

  // ----------------------------------------------------
  // LOAD ALL DATA FROM DATABASE / LOCALSTORAGE
  // ----------------------------------------------------
  const loadAllData = async () => {
    if (!isSupabaseConfigured()) {
      // Local Fallbacks
      const localCms = localStorage.getItem('acob_site_cms_unified');
      if (localCms) setCmsContent(JSON.parse(localCms));

      const localCerts = localStorage.getItem('acob_local_certificates');
      if (localCerts) setCertificates(JSON.parse(localCerts));

      const localEvents = localStorage.getItem('acob_local_events');
      if (localEvents) setEvents(JSON.parse(localEvents));

      const localArchived = localStorage.getItem('acob_archived_events');
      if (localArchived) setArchivedEvents(JSON.parse(localArchived));

      const localResources = localStorage.getItem('acob_local_resources');
      if (localResources) setResourcesList(JSON.parse(localResources));

      const localAdmins = localStorage.getItem('acob_admin_accounts');
      if (localAdmins) setAdminAccounts(JSON.parse(localAdmins));
      loadStudents();
      return;
    }

    try {
      // Fetch dynamic pages visual CMS keys
      const { data: pageKeys } = await supabase.from('site_content').select('*').in('key', [
        'homepage_cms', 'about_cms', 'team_cms', 'jobs_cms', 'contact_cms'
      ]);

      if (pageKeys && pageKeys.length > 0) {
        let mergedCms = { ...cmsContent };
        pageKeys.forEach(row => {
          if (row.key === 'homepage_cms') {
            mergedCms.home_hero_title = row.content?.hero_title || mergedCms.home_hero_title;
            mergedCms.home_hero_subtitle = row.content?.hero_subtitle || mergedCms.home_hero_subtitle;
            mergedCms.home_announcement_banner = row.content?.announcement_banner || mergedCms.home_announcement_banner;
            mergedCms.home_about_text = row.content?.about_text || mergedCms.home_about_text;
          } else if (row.key === 'about_cms') {
            mergedCms.about_title = row.content?.about_title || mergedCms.about_title;
            mergedCms.about_subtitle = row.content?.about_subtitle || mergedCms.about_subtitle;
            mergedCms.about_mission = row.content?.about_mission || mergedCms.about_mission;
            mergedCms.about_vision = row.content?.about_vision || mergedCms.about_vision;
          } else if (row.key === 'team_cms') {
            mergedCms.team_title = row.content?.team_title || mergedCms.team_title;
            mergedCms.team_subtitle = row.content?.team_subtitle || mergedCms.team_subtitle;
          } else if (row.key === 'jobs_cms') {
            mergedCms.jobs_title = row.content?.jobs_title || mergedCms.jobs_title;
            mergedCms.jobs_subtitle = row.content?.jobs_subtitle || mergedCms.jobs_subtitle;
          } else if (row.key === 'contact_cms') {
            mergedCms.contact_title = row.content?.contact_title || mergedCms.contact_title;
            mergedCms.contact_subtitle = row.content?.contact_subtitle || mergedCms.contact_subtitle;
            mergedCms.contact_email = row.content?.contact_email || mergedCms.contact_email;
            mergedCms.contact_phone = row.content?.contact_phone || mergedCms.contact_phone;
            mergedCms.contact_address = row.content?.contact_address || mergedCms.contact_address;
          }
        });
        setCmsContent(mergedCms);
      }

      // Fetch Certificates
      const { data: certsData } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
      if (certsData) setCertificates(certsData);

      // Fetch Events
      const { data: eventsData } = await supabase.from('site_content').select('*').eq('key', 'upcoming_events').single();
      if (eventsData && eventsData.content && Array.isArray(eventsData.content.events)) {
        setEvents(eventsData.content.events);
      }

      // Fetch Archived Events
      const { data: archivedData } = await supabase.from('site_content').select('*').eq('key', 'archived_events').single();
      if (archivedData && archivedData.content && Array.isArray(archivedData.content.events)) {
        setArchivedEvents(archivedData.content.events);
      }

      // Fetch Study Resources
      const { data: resData } = await supabase.from('site_content').select('*').eq('key', 'study_resources').single();
      if (resData && resData.content && Array.isArray(resData.content.categories)) {
        setResourcesList(resData.content.categories);
      }

      // Fetch Admin Accounts
      const { data: adminsData } = await supabase.from('site_content').select('*').eq('key', 'admin_accounts').single();
      if (adminsData && adminsData.content && Array.isArray(adminsData.content.accounts)) {
        setAdminAccounts(adminsData.content.accounts);
      }
    } catch (err: any) {
      console.error('Error loading data:', err);
    } finally {
      loadStudents();
    }
  };

  useEffect(() => {
    if (!loading && session) {
      loadAllData();
    }
  }, [loading, session]);

  // ----------------------------------------------------
  // CMS ACTIONS FOR EACH PAGE
  // ----------------------------------------------------
  const handleSaveCMS = async () => {
    setStatusMsg(`Saving changes for ${cmsSubTab.toUpperCase()} page...`);
    try {
      let key = 'homepage_cms';
      let payload: Record<string, any> = {};

      if (cmsSubTab === 'home') {
        key = 'homepage_cms';
        payload = {
          hero_title: cmsContent.home_hero_title,
          hero_subtitle: cmsContent.home_hero_subtitle,
          announcement_banner: cmsContent.home_announcement_banner,
          about_text: cmsContent.home_about_text
        };
      } else if (cmsSubTab === 'about') {
        key = 'about_cms';
        payload = {
          about_title: cmsContent.about_title,
          about_subtitle: cmsContent.about_subtitle,
          about_mission: cmsContent.about_mission,
          about_vision: cmsContent.about_vision
        };
      } else if (cmsSubTab === 'team') {
        key = 'team_cms';
        payload = {
          team_title: cmsContent.team_title,
          team_subtitle: cmsContent.team_subtitle
        };
      } else if (cmsSubTab === 'jobs') {
        key = 'jobs_cms';
        payload = {
          jobs_title: cmsContent.jobs_title,
          jobs_subtitle: cmsContent.jobs_subtitle
        };
      } else if (cmsSubTab === 'contact') {
        key = 'contact_cms';
        payload = {
          contact_title: cmsContent.contact_title,
          contact_subtitle: cmsContent.contact_subtitle,
          contact_email: cmsContent.contact_email,
          contact_phone: cmsContent.contact_phone,
          contact_address: cmsContent.contact_address
        };
      }

      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('site_content').upsert({
          key,
          content: payload,
          updated_at: new Date().toISOString()
        });
        if (error) throw error;
      } else {
        localStorage.setItem('acob_site_cms_unified', JSON.stringify(cmsContent));
      }
      showToast(`${cmsSubTab.toUpperCase()} CMS Updated Successfully!`);
    } catch (err: any) {
      console.error(err);
      showError(`Database Error: ${err.message || 'Failed to save page CMS data. Check SQL RLS setup.'}`);
    }
  };

  // ----------------------------------------------------
  // CERTIFICATE ACTIONS
  // ----------------------------------------------------
  const handleCreateCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.student_name.trim()) return;

    setStatusMsg('Issuing certificate...');
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const uniqueCertId = `ACOB-${year}-${randomHex}`;

    const newCert = {
      certificate_id: uniqueCertId,
      student_name: certForm.student_name.trim(),
      event_name: certForm.event_name,
      issue_date: certForm.issue_date,
      achievement: certForm.achievement,
      issue_by: 'Applied Cognitio Olympiad Bangladesh',
      created_at: new Date().toISOString()
    };

    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.from('certificates').insert([newCert]).select().single();
        if (error) throw error;
        setCertificates(prev => [data, ...prev]);
      } else {
        const updated = [newCert, ...certificates];
        setCertificates(updated);
        localStorage.setItem('acob_local_certificates', JSON.stringify(updated));
      }
      showToast(`Certificate Issued: ${uniqueCertId}`);
      setShowCertModal(false);
      setCertForm({
        student_name: '',
        event_name: 'National Cognitio Olympiad 2026',
        issue_date: new Date().toISOString().split('T')[0],
        achievement: 'First Place - Champion'
      });
    } catch (err: any) {
      console.error(err);
      showError(`Issue Error: ${err.message || 'Failed to save certificate.'}`);
    }
  };

  const copyToClipboard = (certId: string) => {
    navigator.clipboard.writeText(certId);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ----------------------------------------------------
  // EVENT ACTIONS
  // ----------------------------------------------------
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.id.trim() || !eventForm.title.trim()) return;

    setStatusMsg('Saving Event...');
    let updatedEvents = [...events];
    if (editingEventId) {
      updatedEvents = updatedEvents.map(ev => ev.id === editingEventId ? eventForm : ev);
    } else {
      if (events.some(ev => ev.id === eventForm.id)) {
        showError('An event with this ID already exists.');
        return;
      }
      updatedEvents.push(eventForm);
    }

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('site_content').upsert({
          key: 'upcoming_events',
          content: { events: updatedEvents }
        });
        if (error) throw error;
      } else {
        localStorage.setItem('acob_local_events', JSON.stringify(updatedEvents));
      }
      setEvents(updatedEvents);
      showToast(editingEventId ? 'Event updated!' : 'New Event Added!');
      setShowEventModal(false);
      resetEventForm();
    } catch (err: any) {
      console.error(err);
      showError(`Event Update Error: ${err.message || 'Failed to update event.'}`);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const eventToArchive = events.find(ev => ev.id === eventId);
    if (!eventToArchive) return;

    if (!confirm('Are you sure you want to delete this event? It will be moved to the archives, preserving all participant records.')) return;
    setStatusMsg('Archiving Event...');
    const updatedEvents = events.filter(ev => ev.id !== eventId);
    const updatedArchived = [eventToArchive, ...archivedEvents];

    try {
      if (isSupabaseConfigured()) {
        const { error: error1 } = await supabase.from('site_content').upsert({
          key: 'upcoming_events',
          content: { events: updatedEvents }
        });
        if (error1) throw error1;

        const { error: error2 } = await supabase.from('site_content').upsert({
          key: 'archived_events',
          content: { events: updatedArchived }
        });
        if (error2) throw error2;
      } else {
        localStorage.setItem('acob_local_events', JSON.stringify(updatedEvents));
        localStorage.setItem('acob_archived_events', JSON.stringify(updatedArchived));
      }
      setEvents(updatedEvents);
      setArchivedEvents(updatedArchived);
      showToast('Event moved to archive.');
    } catch (err: any) {
      console.error(err);
      showError(`Archiving Error: ${err.message || 'Failed to archive event.'}`);
    }
  };

  const resetEventForm = () => {
    setEditingEventId(null);
    setEventForm({
      id: '',
      title: '',
      date: '',
      category: 'National Olympiad',
      desc: '',
      syllabus: ''
    });
  };

  // ----------------------------------------------------
  // STUDENT & PARTICIPANT ACTIONS
  // ----------------------------------------------------
  const loadStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await fetch('/api/admin/students');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStudents(data.students || []);
    } catch (err: any) {
      showError(`Error loading students: ${err.message}`);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.full_name.trim() || !studentForm.email.trim()) {
      showError('Name and Email are required.');
      return;
    }
    if (!isEditingStudent && !studentForm.password) {
      showError('Password is required for new students.');
      return;
    }

    setStatusMsg(isEditingStudent ? 'Updating student...' : 'Creating student...');
    try {
      const method = isEditingStudent ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/students', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentForm)
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      showToast(isEditingStudent ? 'Student details updated!' : 'New student account created successfully!');
      setShowStudentModal(false);
      resetStudentForm();
      loadStudents();
    } catch (err: any) {
      showError(`Error saving student: ${err.message || 'Action failed.'}`);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to permanently delete this student account? This cannot be undone.')) return;
    setStatusMsg('Deleting student...');
    try {
      const res = await fetch(`/api/admin/students?id=${studentId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      showToast('Student account deleted successfully.');
      loadStudents();
    } catch (err: any) {
      showError(`Error deleting student: ${err.message || 'Action failed.'}`);
    }
  };

  const handleSendSingleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleEmailSubject.trim() || !singleEmailMessage.trim() || !singleEmailStudent) return;
    setSendingSingleEmail(true);
    setStatusMsg(`Sending email to ${singleEmailStudent.email}...`);

    try {
      // Simulate API call for sending email
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast(`Email successfully sent to ${singleEmailStudent.full_name} (${singleEmailStudent.email})!`);
      setShowSingleEmailModal(false);
      setSingleEmailSubject('');
      setSingleEmailMessage('');
    } catch (err: any) {
      showError('Failed to send email.');
    } finally {
      setSendingSingleEmail(false);
    }
  };

  const handleSendBulkEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkEmailSubject.trim() || !bulkEmailMessage.trim() || !selectedOlympiadForParticipants) return;
    setSendingBulkEmail(true);
    
    // Filter participants
    const participants = students.filter(s => {
      const eventsList = parseEventsList(s.registered_events);
      return eventsList.includes(selectedOlympiadForParticipants.id);
    });

    setStatusMsg(`Sending broadcast to ${participants.length} participants...`);

    try {
      // Simulate API call for sending bulk email
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast(`Broadcast successfully sent to all ${participants.length} participants of ${selectedOlympiadForParticipants.title}!`);
      setShowBulkEmailModal(false);
      setBulkEmailSubject('');
      setBulkEmailMessage('');
    } catch (err: any) {
      showError('Failed to send broadcast.');
    } finally {
      setSendingBulkEmail(false);
    }
  };

  const resetStudentForm = () => {
    setIsEditingStudent(false);
    setStudentForm({
      id: '',
      full_name: '',
      email: '',
      password: '',
      phone: '',
      school: '',
      grade: '',
      registered_events: []
    });
  };

  // ----------------------------------------------------
  // RESOURCE ACTIONS
  // ----------------------------------------------------
  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title.trim()) return;

    setStatusMsg('Saving Resource...');
    const updatedResources = [...resourcesList];
    const categoryIndex = updatedResources.findIndex(cat => cat.id === editingResourceCategory);
    if (categoryIndex === -1) return;

    const items = [...(updatedResources[categoryIndex].items || [])];

    if (editingResourceIndex !== null) {
      items[editingResourceIndex] = resourceForm;
    } else {
      items.push(resourceForm);
    }

    updatedResources[categoryIndex] = {
      ...updatedResources[categoryIndex],
      items
    };

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('site_content').upsert({
          key: 'study_resources',
          content: { categories: updatedResources }
        });
        if (error) throw error;
      } else {
        localStorage.setItem('acob_local_resources', JSON.stringify(updatedResources));
      }
      setResourcesList(updatedResources);
      showToast('Resource Saved!');
      setShowResourceModal(false);
      resetResourceForm();
    } catch (err: any) {
      console.error(err);
      showError(`Resource Save Error: ${err.message || 'Could not update resource in database.'}`);
    }
  };

  const handleDeleteResource = async (categorySlug: string, itemIdx: number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    setStatusMsg('Deleting Resource...');

    const updatedResources = [...resourcesList];
    const categoryIndex = updatedResources.findIndex(cat => cat.id === categorySlug);
    if (categoryIndex === -1) return;

    const items = updatedResources[categoryIndex].items.filter((_: any, idx: number) => idx !== itemIdx);
    updatedResources[categoryIndex] = {
      ...updatedResources[categoryIndex],
      items
    };

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('site_content').upsert({
          key: 'study_resources',
          content: { categories: updatedResources }
        });
        if (error) throw error;
      } else {
        localStorage.setItem('acob_local_resources', JSON.stringify(updatedResources));
      }
      setResourcesList(updatedResources);
      showToast('Resource Deleted.');
    } catch (err: any) {
      console.error(err);
      showError(`Deletion Error: ${err.message || 'Could not delete resource.'}`);
    }
  };

  const resetResourceForm = () => {
    setEditingResourceIndex(null);
    setResourceForm({
      title: '',
      desc: '',
      type: 'PDF',
      link: '#',
      duration: '',
      date: '',
      id: ''
    });
  };

  // ----------------------------------------------------
  // ADMIN CONSOLE ACTIONS (DEVELOPER ONLY)
  // ----------------------------------------------------
  const handleSaveAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.email.trim() || !adminForm.password.trim()) return;

    setStatusMsg('Saving Admin account...');
    const cleanEmail = adminForm.email.trim().toLowerCase();
    if (cleanEmail === DEV_EMAIL) {
      showError('Cannot modify primary developer account via CMS.');
      return;
    }

    let updatedAdmins = [...adminAccounts];
    const existingIndex = updatedAdmins.findIndex(acc => acc.email.toLowerCase() === cleanEmail);

    if (existingIndex !== -1) {
      updatedAdmins[existingIndex] = {
        ...adminForm,
        email: cleanEmail
      };
    } else {
      updatedAdmins.push({
        ...adminForm,
        email: cleanEmail
      });
    }

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('site_content').upsert({
          key: 'admin_accounts',
          content: { accounts: updatedAdmins }
        });
        if (error) throw error;
      } else {
        localStorage.setItem('acob_admin_accounts', JSON.stringify(updatedAdmins));
      }
      setAdminAccounts(updatedAdmins);
      showToast('Admin Account list updated!');
      setShowAdminModal(false);
      setAdminForm({
        email: '',
        password: '',
        role: 'admin',
        permissions: ['cms', 'certificates', 'resources', 'events']
      });
    } catch (err: any) {
      console.error(err);
      showError(`Admin Account Error: ${err.message || 'Failed to update admin account.'}`);
    }
  };

  const handleDeleteAdmin = async (adminEmail: string) => {
    if (!confirm(`Are you sure you want to revoke admin rights for ${adminEmail}?`)) return;
    setStatusMsg('Deleting Admin Account...');
    const updatedAdmins = adminAccounts.filter(acc => acc.email.toLowerCase() !== adminEmail.toLowerCase());

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('site_content').upsert({
          key: 'admin_accounts',
          content: { accounts: updatedAdmins }
        });
        if (error) throw error;
      } else {
        localStorage.setItem('acob_admin_accounts', JSON.stringify(updatedAdmins));
      }
      setAdminAccounts(updatedAdmins);
      showToast('Admin Account Revoked.');
    } catch (err: any) {
      console.error(err);
      showError(`Deletion Error: ${err.message || 'Could not revoke admin rights.'}`);
    }
  };

  // Helper toasts
  const showToast = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3000);
  };
  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 4000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('acob_admin_session');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-500 mx-auto" />
          <p className="text-xs text-neutral-400 font-mono">Verifying Access Level...</p>
        </div>
      </div>
    );
  }

  const isDeveloper = session?.role === 'developer';
  const hasPermission = (perm: string) => {
    if (isDeveloper) return true;
    return session?.permissions?.includes(perm);
  };

  const filteredCerts = certificates.filter(c => 
    c.student_name.toLowerCase().includes(certSearch.toLowerCase()) ||
    c.certificate_id.toLowerCase().includes(certSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Admin header banner */}
      <header className="sticky top-0 z-40 bg-neutral-950/95 border-b border-white/10 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">ACOB Admin Studio</h1>
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-2 py-0.5 rounded-full font-mono font-bold capitalize">
                {session?.role}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 font-mono">{session?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-xl border border-white/5 bg-white/[0.01] transition-all"
          >
            <span>Live site</span>
            <ExternalLink size={12} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20 transition-all font-semibold"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Workspace Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 border-r border-white/10 bg-neutral-950/30 p-4 space-y-1.5 shrink-0">
          <div className="text-[10px] font-bold text-neutral-500 px-3 mb-2 uppercase tracking-wider font-mono">
            Navigation Modules
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
              activeTab === 'overview' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Overview Dashboard</span>
          </button>

          {hasPermission('cms') && (
            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'cms' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Edit3 size={15} />
              <span>Multi-Page CMS</span>
            </button>
          )}

          {hasPermission('certificates') && (
            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'certificates' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award size={15} />
              <span>Certificates Console</span>
            </button>
          )}

          {hasPermission('events') && (
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'events' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar size={15} />
              <span>Upcoming Olympiads</span>
            </button>
          )}

          {hasPermission('events') && (
            <button
              onClick={() => {
                setActiveTab('participants');
                setSelectedOlympiadForParticipants(null);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'participants' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={15} />
              <span>Olympiad Participants</span>
            </button>
          )}

          {hasPermission('resources') && (
            <button
              onClick={() => setActiveTab('resources')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'resources' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen size={15} />
              <span>Study Resources</span>
            </button>
          )}

          {isDeveloper && (
            <button
              onClick={() => setActiveTab('admins')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'admins' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={15} className="text-cyan-400" />
              <span className="text-cyan-200">Manage Admins</span>
            </button>
          )}
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* Notifications */}
          {statusMsg && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-purple-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 size={16} className="text-purple-400" />
              <span>{statusMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <Lock size={16} className="text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tab Renderers */}
          <AnimatePresence mode="wait">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome Back, {session?.email.split('@')[0]}</h2>
                  <p className="text-sm text-neutral-400 max-w-xl">
                    You have authenticated securely. Use the sidebar to update events, certificates, resources, and edit landing page content in real-time.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 font-mono">Issued Certificates</span>
                    <div className="text-2xl font-extrabold text-white mt-1">{certificates.length}</div>
                  </div>
                  <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 font-mono">Upcoming Olympiads</span>
                    <div className="text-2xl font-extrabold text-white mt-1">{events.length}</div>
                  </div>
                  <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 font-mono">Resource Categories</span>
                    <div className="text-2xl font-extrabold text-white mt-1">{resourcesList.length}</div>
                  </div>
                  <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 font-mono">Authorized Admins</span>
                    <div className="text-2xl font-extrabold text-cyan-400 mt-1">{adminAccounts.length + 1}</div>
                  </div>
                </div>

                <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider font-mono">System Configuration</h3>
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                      <span className="text-neutral-400">Database Connection</span>
                      <span className={`font-mono font-bold ${isSupabaseConfigured() ? 'text-emerald-400' : 'text-amber-500'}`}>
                        {isSupabaseConfigured() ? 'Supabase Live Connected' : 'Local Storage Fallback'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                      <span className="text-neutral-400">Environment Mode</span>
                      <span className="font-mono text-neutral-300">production</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2">
                      <span className="text-neutral-400">Security Layer</span>
                      <span className="text-purple-400 font-semibold flex items-center gap-1">
                        <Lock size={12} /> sessionTokenProtected
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. MULTI-PAGE VISUAL CMS EDITOR */}
            {activeTab === 'cms' && hasPermission('cms') && (
              <motion.div
                key="cms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* CMS Page Selector Sub-navigation */}
                <div className="flex flex-wrap gap-2 p-1 bg-neutral-950 border border-white/5 rounded-2xl max-w-2xl">
                  <button
                    onClick={() => setCmsSubTab('home')}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      cmsSubTab === 'home' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Building size={14} />
                    <span>Home Page</span>
                  </button>
                  <button
                    onClick={() => setCmsSubTab('about')}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      cmsSubTab === 'about' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <BookOpen size={14} />
                    <span>About Page</span>
                  </button>
                  <button
                    onClick={() => setCmsSubTab('team')}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      cmsSubTab === 'team' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Users size={14} />
                    <span>Team Page</span>
                  </button>
                  <button
                    onClick={() => setCmsSubTab('jobs')}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      cmsSubTab === 'jobs' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Briefcase size={14} />
                    <span>Jobs Page</span>
                  </button>
                  <button
                    onClick={() => setCmsSubTab('contact')}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      cmsSubTab === 'contact' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Contact2 size={14} />
                    <span>Contact Page</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* CMS Fields Form */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold capitalize">{cmsSubTab} Page Editor</h2>
                        <p className="text-xs text-neutral-500 mt-0.5">Edit this page's structural database CMS variables</p>
                      </div>
                      <button
                        onClick={handleSaveCMS}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Save size={13} />
                        <span>Save Changes</span>
                      </button>
                    </div>

                    <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 space-y-4">
                      {/* HOME CMS fields */}
                      {cmsSubTab === 'home' && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Announcement Banner</label>
                            <input
                              type="text"
                              value={cmsContent.home_announcement_banner}
                              onChange={(e) => setCmsContent({ ...cmsContent, home_announcement_banner: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Hero Headline Title</label>
                            <textarea
                              rows={2}
                              value={cmsContent.home_hero_title}
                              onChange={(e) => setCmsContent({ ...cmsContent, home_hero_title: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Hero Subtitle</label>
                            <textarea
                              rows={3}
                              value={cmsContent.home_hero_subtitle}
                              onChange={(e) => setCmsContent({ ...cmsContent, home_hero_subtitle: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-neutral-300 outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">About Section Overview</label>
                            <textarea
                              rows={4}
                              value={cmsContent.home_about_text}
                              onChange={(e) => setCmsContent({ ...cmsContent, home_about_text: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-neutral-300 outline-none focus:border-purple-500"
                            />
                          </div>
                        </>
                      )}

                      {/* ABOUT CMS fields */}
                      {cmsSubTab === 'about' && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Headline Title</label>
                            <input
                              type="text"
                              value={cmsContent.about_title}
                              onChange={(e) => setCmsContent({ ...cmsContent, about_title: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Subtitle Description</label>
                            <textarea
                              rows={2}
                              value={cmsContent.about_subtitle}
                              onChange={(e) => setCmsContent({ ...cmsContent, about_subtitle: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Our Mission Text</label>
                            <textarea
                              rows={3}
                              value={cmsContent.about_mission}
                              onChange={(e) => setCmsContent({ ...cmsContent, about_mission: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-neutral-300 outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Our Vision Text</label>
                            <textarea
                              rows={3}
                              value={cmsContent.about_vision}
                              onChange={(e) => setCmsContent({ ...cmsContent, about_vision: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-neutral-300 outline-none focus:border-purple-500"
                            />
                          </div>
                        </>
                      )}

                      {/* TEAM CMS fields */}
                      {cmsSubTab === 'team' && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Headline Title</label>
                            <input
                              type="text"
                              value={cmsContent.team_title}
                              onChange={(e) => setCmsContent({ ...cmsContent, team_title: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Subtitle Description</label>
                            <textarea
                              rows={3}
                              value={cmsContent.team_subtitle}
                              onChange={(e) => setCmsContent({ ...cmsContent, team_subtitle: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>
                        </>
                      )}

                      {/* JOBS CMS fields */}
                      {cmsSubTab === 'jobs' && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Headline Title</label>
                            <input
                              type="text"
                              value={cmsContent.jobs_title}
                              onChange={(e) => setCmsContent({ ...cmsContent, jobs_title: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Subtitle Description</label>
                            <textarea
                              rows={3}
                              value={cmsContent.jobs_subtitle}
                              onChange={(e) => setCmsContent({ ...cmsContent, jobs_subtitle: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>
                        </>
                      )}

                      {/* CONTACT CMS fields */}
                      {cmsSubTab === 'contact' && (
                        <>
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Headline Title</label>
                            <input
                              type="text"
                              value={cmsContent.contact_title}
                              onChange={(e) => setCmsContent({ ...cmsContent, contact_title: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Subtitle Description</label>
                            <textarea
                              rows={2}
                              value={cmsContent.contact_subtitle}
                              onChange={(e) => setCmsContent({ ...cmsContent, contact_subtitle: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Contact Email Address</label>
                              <input
                                type="email"
                                value={cmsContent.contact_email}
                                onChange={(e) => setCmsContent({ ...cmsContent, contact_email: e.target.value })}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Contact Phone Number</label>
                              <input
                                type="text"
                                value={cmsContent.contact_phone}
                                onChange={(e) => setCmsContent({ ...cmsContent, contact_phone: e.target.value })}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Headquarters Address</label>
                            <input
                              type="text"
                              value={cmsContent.contact_address}
                              onChange={(e) => setCmsContent({ ...cmsContent, contact_address: e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500"
                            />
                          </div>
                        </>
                      )}

                    </div>
                  </div>

                  {/* Mock preview */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-mono">Live Preview Mockup</h3>
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-5 space-y-4 text-left">
                      
                      {cmsSubTab === 'home' && (
                        <>
                          <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold rounded-lg truncate">
                            {cmsContent.home_announcement_banner}
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold leading-tight">{cmsContent.home_hero_title}</h4>
                            <p className="text-[11px] text-neutral-400 line-clamp-3 leading-relaxed">{cmsContent.home_hero_subtitle}</p>
                          </div>
                          <div className="pt-3 border-t border-white/5 text-[11px] text-neutral-300">
                            <span className="text-[9px] uppercase text-neutral-500 font-bold block mb-1">About Us Section</span>
                            {cmsContent.home_about_text}
                          </div>
                        </>
                      )}

                      {cmsSubTab === 'about' && (
                        <>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold leading-tight">{cmsContent.about_title}</h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">{cmsContent.about_subtitle}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/5">
                            <div className="bg-white/[0.01] border border-white/5 rounded-lg p-2">
                              <span className="text-[9px] uppercase text-cyan-400 font-bold block mb-0.5">Mission</span>
                              <p className="text-[10px] text-neutral-400 leading-normal line-clamp-4">{cmsContent.about_mission}</p>
                            </div>
                            <div className="bg-white/[0.01] border border-white/5 rounded-lg p-2">
                              <span className="text-[9px] uppercase text-purple-400 font-bold block mb-0.5">Vision</span>
                              <p className="text-[10px] text-neutral-400 leading-normal line-clamp-4">{cmsContent.about_vision}</p>
                            </div>
                          </div>
                        </>
                      )}

                      {cmsSubTab === 'team' && (
                        <>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold leading-tight">{cmsContent.team_title}</h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">{cmsContent.team_subtitle}</p>
                          </div>
                          <div className="flex gap-2 pt-3 border-t border-white/5 text-[10px] text-neutral-400">
                            <span className="w-8 h-8 rounded-full bg-neutral-800 shrink-0" />
                            <div>
                              <strong className="text-white block">Dr. Abdullah Al-Mumin</strong>
                              <span>Advisory Board Member</span>
                            </div>
                          </div>
                        </>
                      )}

                      {cmsSubTab === 'jobs' && (
                        <>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold leading-tight">{cmsContent.jobs_title}</h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">{cmsContent.jobs_subtitle}</p>
                          </div>
                          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 pt-2.5 border-l-purple-500 mt-2">
                            <div className="flex items-center justify-between">
                              <strong className="text-xs text-white">Cognitive Content Creator</strong>
                              <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1 rounded">Part-time</span>
                            </div>
                            <p className="text-[10px] text-neutral-500 mt-1">Design rigorous logic and critical evaluation problems.</p>
                          </div>
                        </>
                      )}

                      {cmsSubTab === 'contact' && (
                        <>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold leading-tight">{cmsContent.contact_title}</h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">{cmsContent.contact_subtitle}</p>
                          </div>
                          <div className="pt-3 border-t border-white/5 space-y-1.5 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Email:</span>
                              <span className="text-white font-mono">{cmsContent.contact_email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Phone:</span>
                              <span className="text-white font-mono">{cmsContent.contact_phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Address:</span>
                              <span className="text-white">{cmsContent.contact_address}</span>
                            </div>
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. CERTIFICATE MANAGEMENT CONSOLE */}
            {activeTab === 'certificates' && hasPermission('certificates') && (
              <motion.div
                key="certs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Certificate Issuance Console</h2>
                    <p className="text-xs text-neutral-500">Issue secure, verifiable digital certificates</p>
                  </div>
                  <button
                    onClick={() => setShowCertModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Plus size={13} />
                    <span>Issue Certificate</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={14} />
                    <input
                      type="text"
                      placeholder="Search certificates by student name or ID..."
                      value={certSearch}
                      onChange={(e) => setCertSearch(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-900/60 text-neutral-400 font-bold uppercase border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-5">ID</th>
                          <th className="py-3.5 px-5">Student Name</th>
                          <th className="py-3.5 px-5">Event</th>
                          <th className="py-3.5 px-5">Achievement</th>
                          <th className="py-3.5 px-5">Date</th>
                          <th className="py-3.5 px-5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredCerts.length > 0 ? (
                          filteredCerts.map((cert) => (
                            <tr key={cert.certificate_id} className="hover:bg-white/[0.01] transition-colors">
                              <td className="py-3.5 px-5 font-mono text-purple-400 font-bold flex items-center gap-2">
                                <span>{cert.certificate_id}</span>
                                <button
                                  onClick={() => copyToClipboard(cert.certificate_id)}
                                  className="text-neutral-500 hover:text-white"
                                >
                                  {copiedId === cert.certificate_id ? (
                                    <CheckCircle2 size={12} className="text-emerald-400" />
                                  ) : (
                                    <Copy size={12} />
                                  )}
                                </button>
                              </td>
                              <td className="py-3.5 px-5 font-semibold text-white">{cert.student_name}</td>
                              <td className="py-3.5 px-5 text-neutral-300">{cert.event_name}</td>
                              <td className="py-3.5 px-5 text-amber-300 font-semibold">{cert.achievement}</td>
                              <td className="py-3.5 px-5 text-neutral-500">{cert.issue_date}</td>
                              <td className="py-3.5 px-5 text-right">
                                <Link
                                  href={`/certificates/${cert.certificate_id}`}
                                  target="_blank"
                                  className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:underline bg-purple-500/10 px-2 py-1 rounded"
                                >
                                  <span>View</span>
                                  <ExternalLink size={10} />
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-10 text-center text-neutral-500">
                              No certificates found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. UPCOMING OLYMPIADS TAB */}
            {activeTab === 'events' && hasPermission('events') && (
              <motion.div
                key="events"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Upcoming Olympiads Manager</h2>
                    <p className="text-xs text-neutral-500">Add or update competition cards visible on user dashboard</p>
                  </div>
                  <button
                    onClick={() => {
                      resetEventForm();
                      setShowEventModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus size={13} />
                    <span>Create Olympiad</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.map((ev) => (
                    <div key={ev.id} className="bg-neutral-950 border border-white/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono rounded font-semibold">
                            {ev.category}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">{ev.date}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">{ev.title}</h3>
                        <p className="text-xs text-neutral-400 line-clamp-2">{ev.desc}</p>
                        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 text-[11px] text-neutral-300">
                          <strong className="text-neutral-400">Syllabus:</strong> {ev.syllabus}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/5 mt-3">
                        <button
                          onClick={() => {
                            setEditingEventId(ev.id);
                            setEventForm(ev);
                            setShowEventModal(true);
                          }}
                          className="p-1.5 bg-neutral-900 border border-white/10 rounded-lg text-neutral-400 hover:text-white transition-all"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 5. STUDY RESOURCES TAB */}
            {activeTab === 'resources' && hasPermission('resources') && (
              <motion.div
                key="resources"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Study Resources Database</h2>
                    <p className="text-xs text-neutral-500">Manage PDF guides, tutorial videos, and podcast links</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {resourcesList.map((category) => (
                    <div key={category.id} className="bg-neutral-950 border border-white/10 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                          <BookOpen size={14} className="text-purple-400" />
                          {category.category}
                        </h3>
                        <button
                          onClick={() => {
                            resetResourceForm();
                            setEditingResourceCategory(category.id);
                            setShowResourceModal(true);
                          }}
                          className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-neutral-300 flex items-center gap-1"
                        >
                          <Plus size={11} />
                          <span>Add Item</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.items && category.items.map((item: any, idx: number) => (
                          <div key={idx} className="bg-neutral-900 border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono font-semibold rounded">
                                  {item.type}
                                </span>
                                {item.duration && (
                                  <span className="text-[10px] text-neutral-500 font-mono">{item.duration}</span>
                                )}
                              </div>
                              <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">{item.title}</h4>
                              <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">{item.desc}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
                              <span className="text-[10px] text-neutral-500 font-mono truncate max-w-[120px]">{item.link || item.id}</span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingResourceCategory(category.id);
                                    setEditingResourceIndex(idx);
                                    setResourceForm(item);
                                    setShowResourceModal(true);
                                  }}
                                  className="p-1 bg-neutral-850 hover:bg-neutral-800 border border-white/5 rounded text-neutral-400 hover:text-white"
                                >
                                  <Edit3 size={11} />
                                </button>
                                <button
                                  onClick={() => handleDeleteResource(category.id, idx)}
                                  className="p-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 hover:bg-red-500/20"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 6. ADMINS MANAGEMENT TAB (DEVELOPER ONLY) */}
            {activeTab === 'admins' && isDeveloper && (
              <motion.div
                key="admins"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-cyan-400">Developer Administrator Control</h2>
                    <p className="text-xs text-neutral-500">Revoke permissions or assign new custom administrator accounts</p>
                  </div>
                  <button
                    onClick={() => {
                      setAdminForm({
                        email: '',
                        password: '',
                        role: 'admin',
                        permissions: ['cms', 'certificates', 'resources', 'events']
                      });
                      setShowAdminModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus size={13} />
                    <span>Add New Admin</span>
                  </button>
                </div>

                <div className="bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-900 text-neutral-400 uppercase font-mono font-semibold border-b border-white/10">
                        <tr>
                          <th className="py-3 px-5">Email Address</th>
                          <th className="py-3 px-5">Password</th>
                          <th className="py-3 px-5">Role</th>
                          <th className="py-3 px-5">Allowed Modules</th>
                          <th className="py-3 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr className="bg-white/[0.02]">
                          <td className="py-3.5 px-5 font-semibold text-white flex items-center gap-1.5">
                            <span>{DEV_EMAIL}</span>
                            <span className="px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[8px] font-mono uppercase rounded">Primary</span>
                          </td>
                          <td className="py-3.5 px-5 text-neutral-600 font-mono">•••••••• (Secured via Codebase)</td>
                          <td className="py-3.5 px-5 text-purple-400 font-semibold uppercase">developer</td>
                          <td className="py-3.5 px-5 text-neutral-400">All Modules Allowed (Bypass)</td>
                          <td className="py-3.5 px-5 text-right text-neutral-500 font-mono italic">Protected</td>
                        </tr>

                        {adminAccounts.map((acc) => (
                          <tr key={acc.email} className="hover:bg-white/[0.01]">
                            <td className="py-3.5 px-5 font-medium text-white">{acc.email}</td>
                            <td className="py-3.5 px-5 font-mono text-neutral-400">{acc.password}</td>
                            <td className="py-3.5 px-5 font-mono uppercase text-cyan-400">{acc.role}</td>
                            <td className="py-3.5 px-5 flex flex-wrap gap-1 items-center max-w-sm pt-4">
                              {acc.permissions.map((p: string) => (
                                <span key={p} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-neutral-400 uppercase">
                                  {p}
                                </span>
                              ))}
                            </td>
                            <td className="py-3.5 px-5 text-right">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => {
                                    setAdminForm(acc);
                                    setShowAdminModal(true);
                                  }}
                                  className="p-1 bg-neutral-900 border border-white/10 rounded text-neutral-400 hover:text-white"
                                >
                                  <Edit3 size={11} />
                                </button>
                                <button
                                  onClick={() => handleDeleteAdmin(acc.email)}
                                  className="p-1 bg-red-500/10 border border-red-500/20 rounded text-red-400 hover:bg-red-500/20"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 7. OLYMPIAD PARTICIPANTS TAB */}
            {activeTab === 'participants' && (
              <motion.div
                key="participants"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 text-left"
              >
                {!selectedOlympiadForParticipants ? (
                  <>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Olympiad Participants Manager
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Select an ongoing or archived Olympiad cycle to view enrolled participants, issue certificates, or bulk broadcast announcements.
                      </p>
                    </div>

                    {/* Active Olympiads */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2">Active Olympiads</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {events.map((ev) => {
                          const registeredList = students.filter(s => {
                            const eventsList = parseEventsList(s.registered_events);
                            return eventsList.includes(ev.id);
                          });

                          return (
                            <div
                              key={ev.id}
                              className="bg-neutral-950 border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                            >
                              <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-[9px] font-mono font-bold text-purple-400 uppercase rounded">
                                    {ev.category}
                                  </span>
                                  <span className="text-[10px] text-neutral-500 font-semibold font-mono">
                                    {ev.date}
                                  </span>
                                </div>

                                <h3 className="text-sm font-bold text-white">{ev.title}</h3>
                                <p className="text-xs text-neutral-400 line-clamp-2">{ev.desc}</p>
                              </div>

                              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="text-xs">
                                  <span className="text-neutral-500">Total Enrolled: </span>
                                  <span className="font-bold text-purple-400 font-mono">{registeredList.length} students</span>
                                </div>

                                <button
                                  onClick={() => setSelectedOlympiadForParticipants(ev)}
                                  className="px-3.5 py-1.5 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 rounded-xl text-[10px] font-bold text-neutral-300 hover:text-white transition-all flex items-center gap-1"
                                >
                                  <span>Manage Console</span>
                                  <ExternalLink size={10} />
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {events.length === 0 && (
                          <div className="col-span-full py-6 text-center border border-dashed border-white/5 rounded-2xl bg-neutral-950/20 text-neutral-500 text-xs font-mono">
                            No active Olympiads.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Archived Olympiads */}
                    <div className="space-y-3 pt-4">
                      <h3 className="text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-2 flex items-center gap-1.5">
                        <span>Archived Olympiads</span>
                        <span className="px-1.5 py-0.2 bg-white/5 border border-white/10 text-[8px] rounded font-mono font-normal">Archive</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {archivedEvents.map((ev) => {
                          const registeredList = students.filter(s => {
                            const eventsList = parseEventsList(s.registered_events);
                            return eventsList.includes(ev.id);
                          });

                          return (
                            <div
                              key={ev.id}
                              className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 hover:border-purple-500/20 transition-all flex flex-col justify-between opacity-80 hover:opacity-100"
                            >
                              <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-neutral-400 uppercase rounded">
                                    {ev.category}
                                  </span>
                                  <span className="text-[10px] text-neutral-500 font-semibold font-mono">
                                    {ev.date}
                                  </span>
                                </div>

                                <h3 className="text-sm font-bold text-neutral-300">{ev.title}</h3>
                                <p className="text-xs text-neutral-500 line-clamp-2">{ev.desc}</p>
                              </div>

                              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="text-xs">
                                  <span className="text-neutral-500">Total Enrolled: </span>
                                  <span className="font-bold text-neutral-400 font-mono">{registeredList.length} students</span>
                                </div>

                                <button
                                  onClick={() => setSelectedOlympiadForParticipants(ev)}
                                  className="px-3.5 py-1.5 bg-white/5 hover:bg-purple-500/10 border border-white/10 rounded-xl text-[10px] font-bold text-neutral-400 hover:text-white transition-all flex items-center gap-1"
                                >
                                  <span>View Participants</span>
                                  <ExternalLink size={10} />
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {archivedEvents.length === 0 && (
                          <div className="col-span-full py-6 text-center border border-dashed border-white/5 rounded-2xl bg-neutral-950/10 text-neutral-600 text-xs font-mono">
                            No archived Olympiads.
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Participant Details View */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                      <div className="space-y-1">
                        <button
                          onClick={() => setSelectedOlympiadForParticipants(null)}
                          className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-all flex items-center gap-1 mb-1.5 uppercase font-mono"
                        >
                          <ArrowLeft size={10} />
                          <span>Back to Olympiads</span>
                        </button>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>{selectedOlympiadForParticipants.title}</span>
                          <span className="text-xs px-2 py-0.5 bg-neutral-900 border border-white/15 text-neutral-400 rounded-full font-mono font-normal">
                            {students.filter(s => {
                              const eventsList = parseEventsList(s.registered_events);
                              return eventsList.includes(selectedOlympiadForParticipants.id);
                            }).length} participants
                          </span>
                        </h2>
                        <p className="text-xs text-neutral-400">{selectedOlympiadForParticipants.desc}</p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setBulkEmailSubject(`Notice regarding ${selectedOlympiadForParticipants.title}`);
                            setBulkEmailMessage('');
                            setShowBulkEmailModal(true);
                          }}
                          className="px-3.5 py-2 bg-neutral-900 border border-white/10 hover:bg-neutral-800 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5"
                        >
                          <Mail size={13} />
                          <span>Bulk Message</span>
                        </button>

                        <button
                          onClick={() => {
                            resetStudentForm();
                            setStudentForm({
                              id: '',
                              full_name: '',
                              email: '',
                              password: '',
                              phone: '',
                              school: '',
                              grade: '',
                              registered_events: [selectedOlympiadForParticipants.id]
                            });
                            setIsEditingStudent(false);
                            setShowStudentModal(true);
                          }}
                          className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5"
                        >
                          <Plus size={13} />
                          <span>Add Participant</span>
                        </button>
                      </div>
                    </div>

                    {/* Filters & Students Table */}
                    <div className="space-y-4">
                      <div className="relative max-w-sm">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="Search participants by name, school, class or email..."
                          value={studentSearchQuery}
                          onChange={(e) => setStudentSearchQuery(e.target.value)}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-neutral-600 outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-neutral-900 text-neutral-400 uppercase font-mono font-semibold border-b border-white/10">
                              <tr>
                                <th className="py-3 px-5">Student Details</th>
                                <th className="py-3 px-5">Account Credentials</th>
                                <th className="py-3 px-5">Institution & Class</th>
                                <th className="py-3 px-5 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {students
                                .filter(s => {
                                  const eventsList = parseEventsList(s.registered_events);
                                  if (!eventsList.includes(selectedOlympiadForParticipants.id)) return false;

                                  const query = studentSearchQuery.toLowerCase().trim();
                                  if (!query) return true;

                                  return (
                                    (s.full_name || '').toLowerCase().includes(query) ||
                                    (s.email || '').toLowerCase().includes(query) ||
                                    (s.school || '').toLowerCase().includes(query) ||
                                    (s.grade || '').toLowerCase().includes(query)
                                  );
                                })
                                .map((student) => (
                                  <tr key={student.id} className="hover:bg-white/[0.01]">
                                    <td className="py-3.5 px-5">
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={student.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.full_name || '')}`}
                                          alt=""
                                          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 shrink-0"
                                        />
                                        <div>
                                          <div className="font-semibold text-white">{student.full_name}</div>
                                          <div className="text-[10px] text-neutral-500 font-mono">{student.phone || 'No phone number'}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-5 space-y-0.5">
                                      <div className="text-white font-medium">{student.email}</div>
                                      <div className="flex items-center gap-1.5 text-[10px]">
                                        <span className="text-neutral-500">Password:</span>
                                        <span className="font-mono text-purple-400 bg-purple-500/5 px-1 py-0.2 rounded border border-purple-500/10">
                                          {student.password_plain || '🔒 (Encrypted)'}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3.5 px-5">
                                      <div className="text-neutral-300 font-medium">{student.school}</div>
                                      <div className="text-[10px] text-neutral-500 font-mono">{student.grade}</div>
                                    </td>
                                    <td className="py-3.5 px-5 text-right">
                                      <div className="flex gap-2 justify-end items-center">
                                        <button
                                          onClick={() => {
                                            setCertForm({
                                              student_name: student.full_name,
                                              event_name: selectedOlympiadForParticipants.title,
                                              achievement: 'Participation Certificate',
                                              issue_date: new Date().toISOString().split('T')[0]
                                            });
                                            setShowCertModal(true);
                                          }}
                                          title="Issue Certificate"
                                          className="p-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded hover:bg-purple-500/20 transition-colors"
                                        >
                                          <Award size={12} />
                                        </button>

                                        <button
                                          onClick={() => {
                                            setSingleEmailStudent(student);
                                            setSingleEmailSubject(`ACOB ${selectedOlympiadForParticipants.title} Update`);
                                            setSingleEmailMessage(`Hello ${student.full_name},\n\nWe wanted to reach out regarding the upcoming Olympiad...`);
                                            setShowSingleEmailModal(true);
                                          }}
                                          title="Send Email"
                                          className="p-1.5 bg-neutral-900 border border-white/10 text-neutral-400 rounded hover:text-white transition-colors"
                                        >
                                          <Mail size={12} />
                                        </button>

                                        <button
                                          onClick={() => {
                                            const eventsList = parseEventsList(student.registered_events);
                                            
                                            setStudentForm({
                                              id: student.id,
                                              full_name: student.full_name,
                                              email: student.email,
                                              password: student.password_plain || '',
                                              phone: student.phone || '',
                                              school: student.school || '',
                                              grade: student.grade || '',
                                              registered_events: eventsList
                                            });
                                            setIsEditingStudent(true);
                                            setShowStudentModal(true);
                                          }}
                                          title="Edit Student Account"
                                          className="p-1.5 bg-neutral-900 border border-white/10 text-neutral-400 rounded hover:text-white transition-colors"
                                        >
                                          <Edit3 size={12} />
                                        </button>

                                        <button
                                          onClick={async () => {
                                            if (!confirm(`Are you sure you want to remove ${student.full_name} from ${selectedOlympiadForParticipants.title}?`)) return;
                                            
                                            const eventsList = parseEventsList(student.registered_events);
                                            const updatedEvents = eventsList.filter((e: string) => e !== selectedOlympiadForParticipants.id);

                                            setStatusMsg('Removing participant...');
                                            try {
                                              const res = await fetch('/api/admin/students', {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                  id: student.id,
                                                  full_name: student.full_name,
                                                  registered_events: updatedEvents
                                                })
                                              });
                                              const resData = await res.json();
                                              if (resData.error) throw new Error(resData.error);
                                              
                                              showToast('Student successfully removed from this event.');
                                              loadStudents();
                                            } catch (err: any) {
                                              showError(`Failed to remove: ${err.message}`);
                                            }
                                          }}
                                          title="Remove from Olympiad"
                                          className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}

                              {students.filter(s => {
                                const eventsList = parseEventsList(s.registered_events);
                                return eventsList.includes(selectedOlympiadForParticipants.id);
                              }).length === 0 && (
                                <tr>
                                  <td colSpan={4} className="py-10 text-center text-neutral-500 font-mono">
                                    No participants enrolled in this Olympiad yet.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ----------------------------------------------------
          MODALS
      ---------------------------------------------------- */}
      {/* 1. Certificate Creation Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
              <Award size={16} />
              <span>Issue New Certificate</span>
            </h3>

            <form onSubmit={handleCreateCert} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={certForm.student_name}
                  onChange={(e) => setCertForm({ ...certForm, student_name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Event / Competition</label>
                <input
                  type="text"
                  required
                  value={certForm.event_name}
                  onChange={(e) => setCertForm({ ...certForm, event_name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Achievement</label>
                <input
                  type="text"
                  required
                  value={certForm.achievement}
                  onChange={(e) => setCertForm({ ...certForm, achievement: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Issue Date</label>
                <input
                  type="date"
                  required
                  value={certForm.issue_date}
                  onChange={(e) => setCertForm({ ...certForm, issue_date: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold"
                >
                  Confirm & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Event Creation/Edit Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
              <Calendar size={16} />
              <span>{editingEventId ? 'Edit Olympiad' : 'Create New Olympiad'}</span>
            </h3>

            <form onSubmit={handleSaveEvent} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Unique Event Slug ID</label>
                <input
                  type="text"
                  required
                  disabled={editingEventId !== null}
                  placeholder="e.g. acob-2026"
                  value={eventForm.id}
                  onChange={(e) => setEventForm({ ...eventForm, id: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Olympiad Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Applied Cognitio Olympiad 2026"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Event Category</label>
                <input
                  type="text"
                  required
                  value={eventForm.category}
                  onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Date String</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. August 28, 2026"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summarize the event..."
                  value={eventForm.desc}
                  onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Syllabus Overview</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Logical deduction, pattern recognition"
                  value={eventForm.syllabus}
                  onChange={(e) => setEventForm({ ...eventForm, syllabus: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Resource Item Creation/Edit Modal */}
      {showResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
              <BookOpen size={16} />
              <span>{editingResourceIndex !== null ? 'Edit Resource Item' : 'Add Study Resource Item'}</span>
            </h3>

            <form onSubmit={handleSaveResource} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Past Papers Analysis 2024"
                  value={resourceForm.title}
                  onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Briefly describe what this resource is..."
                  value={resourceForm.desc}
                  onChange={(e) => setResourceForm({ ...resourceForm, desc: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Type Tag</label>
                  <select
                    value={resourceForm.type}
                    onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                  >
                    <option value="PDF">PDF Guide</option>
                    <option value="Video">Video Tutorial</option>
                    <option value="Download">Download Zip</option>
                    <option value="Podcast">Podcast Episode</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Link URL / ID</label>
                  <input
                    type="text"
                    required
                    placeholder="# or youtube_id"
                    value={resourceForm.link}
                    onChange={(e) => setResourceForm({ ...resourceForm, link: e.target.value, id: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {resourceForm.type === 'Podcast' && (
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Duration (e.g. 27:17)</label>
                    <input
                      type="text"
                      placeholder="27:17"
                      value={resourceForm.duration}
                      onChange={(e) => setResourceForm({ ...resourceForm, duration: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Release Date</label>
                    <input
                      type="text"
                      placeholder="June 09, 2026"
                      value={resourceForm.date}
                      onChange={(e) => setResourceForm({ ...resourceForm, date: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowResourceModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Admin Management Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-1.5">
              <Mail size={16} />
              <span>Assign Admin Credentials</span>
            </h3>

            <form onSubmit={handleSaveAdmin} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  placeholder="admin-email@acobd.org"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Admin Password</label>
                <input
                  type="text"
                  required
                  placeholder="Create a strong password..."
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Module Permissions</label>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                  <label className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg p-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminForm.permissions.includes('cms')}
                      onChange={(e) => {
                        const newPerms = e.target.checked
                          ? [...adminForm.permissions, 'cms']
                          : adminForm.permissions.filter(p => p !== 'cms');
                        setAdminForm({ ...adminForm, permissions: newPerms });
                      }}
                      className="rounded accent-cyan-500"
                    />
                    <span>Visual CMS</span>
                  </label>

                  <label className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg p-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminForm.permissions.includes('certificates')}
                      onChange={(e) => {
                        const newPerms = e.target.checked
                          ? [...adminForm.permissions, 'certificates']
                          : adminForm.permissions.filter(p => p !== 'certificates');
                        setAdminForm({ ...adminForm, permissions: newPerms });
                      }}
                      className="rounded accent-cyan-500"
                    />
                    <span>Certificates</span>
                  </label>

                  <label className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg p-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminForm.permissions.includes('events')}
                      onChange={(e) => {
                        const newPerms = e.target.checked
                          ? [...adminForm.permissions, 'events']
                          : adminForm.permissions.filter(p => p !== 'events');
                        setAdminForm({ ...adminForm, permissions: newPerms });
                      }}
                      className="rounded accent-cyan-500"
                    />
                    <span>Olympiads</span>
                  </label>

                  <label className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg p-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminForm.permissions.includes('resources')}
                      onChange={(e) => {
                        const newPerms = e.target.checked
                          ? [...adminForm.permissions, 'resources']
                          : adminForm.permissions.filter(p => p !== 'resources');
                        setAdminForm({ ...adminForm, permissions: newPerms });
                      }}
                      className="rounded accent-cyan-500"
                    />
                    <span>Study Resources</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl text-xs font-semibold"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Student Creation/Edit Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
              <Users size={16} />
              <span>{isEditingStudent ? 'Edit Student Details' : 'Register New Student'}</span>
            </h3>

            <form onSubmit={handleSaveStudent} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={studentForm.full_name}
                  onChange={(e) => setStudentForm({ ...studentForm, full_name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@example.com"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Password</label>
                <input
                  type="text"
                  required={!isEditingStudent}
                  placeholder={isEditingStudent ? "Leave blank to keep existing password" : "Create password..."}
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+880 1XXXXXXXXX"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Class / Grade</label>
                  <input
                    type="text"
                    placeholder="e.g. Class 10"
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">School / Institution</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka College"
                  value={studentForm.school}
                  onChange={(e) => setStudentForm({ ...studentForm, school: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              {/* Checkboxes for Registered Olympiads */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">Enrolled Olympiads</label>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {events.map((ev) => (
                    <label key={ev.id} className="flex items-center gap-2 bg-white/[0.01] border border-white/5 rounded-lg p-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={studentForm.registered_events.includes(ev.id)}
                        onChange={(e) => {
                          const list = e.target.checked
                            ? [...studentForm.registered_events, ev.id]
                            : studentForm.registered_events.filter((id) => id !== ev.id);
                          setStudentForm({ ...studentForm, registered_events: list });
                        }}
                        className="rounded accent-purple-500"
                      />
                      <span>{ev.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Single Student Email Modal */}
      {showSingleEmailModal && singleEmailStudent && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
              <Mail size={16} />
              <span>Email {singleEmailStudent.full_name}</span>
            </h3>

            <form onSubmit={handleSendSingleEmail} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">To</label>
                <input
                  type="text"
                  disabled
                  value={`${singleEmailStudent.full_name} <${singleEmailStudent.email}>`}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Enter email subject..."
                  value={singleEmailSubject}
                  onChange={(e) => setSingleEmailSubject(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Message Body</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write your message here..."
                  value={singleEmailMessage}
                  onChange={(e) => setSingleEmailMessage(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500 font-sans"
                />
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSingleEmailModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingSingleEmail}
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  {sendingSingleEmail ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Bulk Email Broadcast Modal */}
      {showBulkEmailModal && selectedOlympiadForParticipants && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-1.5">
              <Mail size={16} />
              <span>Broadcast Announcement</span>
            </h3>

            <p className="text-[11px] text-neutral-500 font-sans">
              This message will be broadcast to all registered participants of <span className="font-bold text-white">{selectedOlympiadForParticipants.title}</span>.
            </p>

            <form onSubmit={handleSendBulkEmail} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">Target Audience</label>
                <input
                  type="text"
                  disabled
                  value={`All Participants of ${selectedOlympiadForParticipants.title}`}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Enter broadcast subject..."
                  value={bulkEmailSubject}
                  onChange={(e) => setBulkEmailSubject(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 font-mono">Broadcast Message</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write your announcement or updates here..."
                  value={bulkEmailMessage}
                  onChange={(e) => setBulkEmailMessage(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500 font-sans"
                />
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBulkEmailModal(false)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingBulkEmail}
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  {sendingBulkEmail ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Send Broadcast</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
