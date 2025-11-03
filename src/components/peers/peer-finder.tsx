import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Users, Star, MessageCircle, Clock, MapPin, Search } from 'lucide-react';
import { PeerMatch } from '../../lib/mock-data';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PeerFinderProps {
  matches: PeerMatch[];
}

export function PeerFinder({ matches }: PeerFinderProps) {
  const [topic, setTopic] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [filteredMatches, setFilteredMatches] = useState(matches);

  const handleSearch = () => {
    // Simulate filtering
    setFilteredMatches(matches);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Find Your Study Partner</h1>
          <p className="text-gray-400">
            Connect with peers who share your interests and learning goals
          </p>
        </div>

        {/* Search filters */}
        <Card className="p-6 mb-8 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="topic" className="text-white mb-2">Topic/Interest</Label>
              <Input
                id="topic"
                placeholder="e.g., React, Machine Learning"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="skill" className="text-white mb-2">Skill Level</Label>
              <Select value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Any level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone" className="text-white mb-2">Timezone</Label>
              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Any timezone" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                  <SelectItem value="utc-6">UTC-6 (CST)</SelectItem>
                  <SelectItem value="utc-8">UTC-8 (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </Card>

        {/* Match results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl text-white">Top Matches for You</h2>
          <p className="text-gray-400">{filteredMatches.length} peers found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                {/* Match score badge */}
                <div className="flex items-start justify-between mb-4">
                  <Avatar className="w-16 h-16 border-2 border-purple-500/50">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xl">
                      {match.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {match.matchScore}% Match
                  </Badge>
                </div>

                <h3 className="text-xl text-white mb-1">{match.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{match.bio}</p>

                {/* Common topics */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Common Interests</p>
                  <div className="flex flex-wrap gap-1">
                    {match.commonTopics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{match.skillLevel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{match.timezone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{match.availability}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-white/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-purple-500/30">
            <h3 className="text-white mb-4">Tips for Successful Collaboration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: '🎯',
                  title: 'Set Clear Goals',
                  desc: 'Define what you want to accomplish together',
                },
                {
                  icon: '📅',
                  title: 'Schedule Regular Sessions',
                  desc: 'Consistency is key to making progress',
                },
                {
                  icon: '💬',
                  title: 'Communicate Openly',
                  desc: 'Share ideas, ask questions, help each other',
                },
              ].map((tip) => (
                <div key={tip.title} className="flex gap-3">
                  <div className="text-3xl">{tip.icon}</div>
                  <div>
                    <h4 className="text-white mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-400">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
