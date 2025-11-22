import { ref } from 'vue';

export function useUserUtils() {
  const roles = ref([
    { role_id: 'admin', role_name: 'Admin', description: 'Full system access and management' },
    { role_id: 'moderator', role_name: 'Moderator', description: 'Content moderation and user management' },
    { role_id: 'user', role_name: 'User', description: 'Standard platform access' }
  ]);

  const tabs = ref([
    { id: 'progress', name: 'Progress Overview' },
    { id: 'submissions', name: 'Submissions History' },
    { id: 'ai', name: 'AI Interactions' }
  ]);

  const getUserInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  };

  const getRoleName = (roleId) => {
    const role = roles.value.find(r => r.role_id === roleId);
    return role ? role.role_name : 'User';
  };

  const getRoleClass = (roleId) => {
    const classes = {
      'admin': 'bg-purple-100 text-purple-800',
      'moderator': 'bg-blue-100 text-blue-800',
      'user': 'bg-gray-100 text-gray-800'
    };
    return classes[roleId] || classes.user;
  };

  const getStatusClass = (status) => {
    const classes = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-yellow-100 text-yellow-800',
      banned: 'bg-red-100 text-red-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    return classes[status] || classes.pending;
  };

  const getStatusDotClass = (status) => {
    const classes = {
      active: 'bg-green-500',
      suspended: 'bg-yellow-500',
      banned: 'bg-red-500',
      pending: 'bg-gray-500'
    };
    return classes[status] || classes.pending;
  };

  const getProgressColor = (progress) => {
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-yellow-500';
    if (progress < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const formatTimeSpent = (seconds) => {
    if (!seconds) return '0h 0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return {
    roles,
    tabs,
    getUserInitials,
    getRoleName,
    getRoleClass,
    getStatusClass,
    getStatusDotClass,
    getProgressColor,
    formatDate,
    formatTimeSpent
  };
}