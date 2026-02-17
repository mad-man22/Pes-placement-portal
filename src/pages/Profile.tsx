
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Shield, Calendar, LogOut, Edit2, Save, X, Briefcase, GraduationCap, Link as LinkIcon, Phone, MapPin, CheckCircle2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [completion, setCompletion] = useState(0);

    // Form State
    const [formData, setFormData] = useState({
        full_name: "",
        bio: "",
        phone: "",
        location: "",
        avatar_url: "",
        linkedin_url: "",
        github_url: "",
        portfolio_url: "",
        skills: "",
        university: "",
        degree: "",
        grad_year: "",
    });

    // Initialize state from user metadata
    useEffect(() => {
        if (user?.user_metadata) {
            const meta = user.user_metadata;
            setFormData({
                full_name: meta.full_name || "",
                bio: meta.bio || "",
                phone: meta.phone || "",
                location: meta.location || "",
                avatar_url: meta.avatar_url || "",
                linkedin_url: meta.linkedin_url || "",
                github_url: meta.github_url || "",
                portfolio_url: meta.portfolio_url || "",
                skills: meta.skills ? (Array.isArray(meta.skills) ? meta.skills.join(", ") : meta.skills) : "",
                university: meta.education?.university || "",
                degree: meta.education?.degree || "",
                grad_year: meta.education?.grad_year || "",
            });
        }
    }, [user]);

    // Calculate Completion
    useEffect(() => {
        const fields = [
            formData.full_name,
            formData.bio,
            formData.phone,
            formData.location,
            formData.avatar_url,
            formData.linkedin_url,
            formData.skills,
            formData.university,
            formData.degree
        ];
        const filled = fields.filter(f => f && f.trim().length > 0).length;
        const total = fields.length;
        setCompletion(Math.round((filled / total) * 100));
    }, [formData]);

    const handleLogout = async () => {
        await signOut();
        navigate("/");
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars') // Requires "avatars" bucket to exist
                .upload(filePath, file);

            if (uploadError) {
                // Check if it's a "Bucket not found" error (usually implicit in the error message or code)
                if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
                    throw new Error("Storage bucket 'avatars' not found. Please create a public bucket named 'avatars' in your Supabase dashboard.");
                }
                throw uploadError;
            }

            // Get Public URL
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

            setFormData({ ...formData, avatar_url: data.publicUrl });
            toast.success("Profile photo uploaded!");

        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error("Error uploading image", {
                description: error.message
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.full_name,
                    bio: formData.bio,
                    phone: formData.phone,
                    location: formData.location,
                    avatar_url: formData.avatar_url,
                    linkedin_url: formData.linkedin_url,
                    github_url: formData.github_url,
                    portfolio_url: formData.portfolio_url,
                    skills: formData.skills, // Save as string for simplicity or split here
                    education: {
                        university: formData.university,
                        degree: formData.degree,
                        grad_year: formData.grad_year,
                    }
                }
            });

            if (error) throw error;
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile", { description: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Layout>
                <div className="flex h-[80vh] items-center justify-center">
                    <p>Please log in to view your profile.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 mb-20">

                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                        <p className="text-muted-foreground mt-2">Manage your account settings and resume details.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit2 className="h-4 w-4 mr-2" />}
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </Button>
                        <Button variant="destructive" onClick={handleLogout} className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Profile Completion</span>
                        <span className="text-sm font-bold text-primary">{completion}%</span>
                    </div>
                    <Progress value={completion} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                        {completion < 100 ? "Complete your profile to stand out to recruiters." : "Great job! Your profile is complete."}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Left Column: Avatar & Basic Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6 text-center">
                            <div className="relative mx-auto w-32 h-32 mb-4">
                                {formData.avatar_url ? (
                                    <img src={formData.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-background shadow-lg" />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-4xl font-bold text-muted-foreground border-4 border-background shadow-lg">
                                        {formData.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {isEditing ? (
                                <div className="space-y-3">
                                    {/* Avatar Upload */}
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-xs text-left block">Profile Picture</Label>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            className="w-full gap-2"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                        >
                                            <Camera className="h-4 w-4" />
                                            {uploading ? "Uploading..." : "Upload Photo"}
                                        </Button>
                                        {formData.avatar_url && (
                                            <p className="text-[10px] text-muted-foreground text-left truncate">
                                                Current: {formData.avatar_url.split('/').pop()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="full_name" className="text-xs text-left block">Full Name</Label>
                                        <Input
                                            id="full_name"
                                            placeholder="John Doe"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="bio" className="text-xs text-left block">Bio / Headline</Label>
                                        <Textarea
                                            id="bio"
                                            placeholder="Software Engineer | React Enthusiast"
                                            className="resize-none h-20 text-xs"
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold">{formData.full_name || "User Name"}</h2>
                                    <p className="text-sm text-primary font-medium mb-2">{formData.bio || "No bio added yet"}</p>
                                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                        <Mail className="h-3 w-3" />
                                        {user.email}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" /> Contact Details
                            </h3>
                            {isEditing ? (
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-xs">Phone Number</Label>
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Location</Label>
                                        <Input
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="New York, USA"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2 text-sm">
                                    {formData.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3 w-3 text-muted-foreground" />
                                            <span>{formData.phone}</span>
                                        </div>
                                    )}
                                    {formData.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-3 w-3 text-muted-foreground" />
                                            <span>{formData.location}</span>
                                        </div>
                                    )}
                                    {!formData.phone && !formData.location && <p className="text-muted-foreground italic text-xs">No contact details added.</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Resume Details */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Skills */}
                        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg">Skills & Expertise</h3>
                            </div>
                            {isEditing ? (
                                <div>
                                    <Label>Skills (comma separated)</Label>
                                    <Textarea
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        placeholder="React, TypeScript, Node.js, UI/UX Design..."
                                        className="mt-2"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Separate skills with commas.</p>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills ? formData.skills.split(',').map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                                            {skill.trim()}
                                        </span>
                                    )) : (
                                        <p className="text-muted-foreground italic">No skills listed.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Education */}
                        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg">Education</h3>
                            </div>

                            {isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <Label>University / College</Label>
                                        <Input
                                            value={formData.university}
                                            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                            placeholder="Harvard University"
                                        />
                                    </div>
                                    <div>
                                        <Label>Degree</Label>
                                        <Input
                                            value={formData.degree}
                                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                            placeholder="B.S. Computer Science"
                                        />
                                    </div>
                                    <div>
                                        <Label>Graduation Year</Label>
                                        <Input
                                            value={formData.grad_year}
                                            onChange={(e) => setFormData({ ...formData, grad_year: e.target.value })}
                                            placeholder="2024"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {formData.university ? (
                                        <div>
                                            <h4 className="font-medium text-base">{formData.university}</h4>
                                            <p className="text-sm text-muted-foreground">{formData.degree} • {formData.grad_year}</p>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground italic">No education details added.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <LinkIcon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg">Portfolio & Socials</h3>
                            </div>

                            {isEditing ? (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label className="col-span-1">LinkedIn URL</Label>
                                        <Input
                                            className="col-span-2"
                                            value={formData.linkedin_url}
                                            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label className="col-span-1">GitHub URL</Label>
                                        <Input
                                            className="col-span-2"
                                            value={formData.github_url}
                                            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label className="col-span-1">Portfolio Website</Label>
                                        <Input
                                            className="col-span-2"
                                            value={formData.portfolio_url}
                                            onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                                            placeholder="https://myportfolio.com"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {formData.linkedin_url && (
                                        <a href={formData.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                            LinkedIn Profile
                                        </a>
                                    )}
                                    {formData.github_url && (
                                        <a href={formData.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground hover:underline">
                                            GitHub Profile
                                        </a>
                                    )}
                                    {formData.portfolio_url && (
                                        <a href={formData.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                            Portfolio Website
                                        </a>
                                    )}
                                    {!formData.linkedin_url && !formData.github_url && !formData.portfolio_url && (
                                        <p className="text-muted-foreground italic">No links added.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Save Button (Only in Edit Mode) */}
                        {isEditing && (
                            <div className="flex justify-end gap-2 pt-4">
                                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button onClick={handleSave} disabled={loading}>
                                    {loading ? "Saving..." : "Save Changes"}
                                    <Save className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
