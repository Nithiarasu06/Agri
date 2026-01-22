import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
  Alert,
  CircularProgress,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckIcon,
  OpenInNew as OpenInNewIcon,
  Star as StarIcon,
  Agriculture as AgriculutureIcon,
  Landscape as LandscapeIcon,
  LocationOn as LocationIcon,
  LocalFlorist as CropsIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../App';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SubsidyRecommender = ({ farmerProfile }) => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [aiPowered, setAiPowered] = useState(false);
  const [modelUsed, setModelUsed] = useState('');

  const getRecommendations = async () => {
    if (!farmerProfile) {
      setError(t('farmerProfileRequired'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/subsidy/recommend`, {
        ...farmerProfile,
        language
      });

      if (response.data.success) {
        setRecommendations(response.data.recommendations);
        setAiPowered(Boolean(response.data.ai_powered));
        setModelUsed(response.data.model_used || '');
      }
    } catch (err) {
      setError(
        err.response?.data?.error || t('failedToGetRecommendations')
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Direct Income Support': '#4caf50',
      'Irrigation': '#2196f3',
      'Crop Insurance': '#ff9800',
      'Energy': '#ffc107',
      'Credit': '#9c27b0',
      'Organic Farming': '#8bc34a',
      'Mechanization': '#607d8b',
      'Horticulture': '#e91e63',
    };
    return colors[category] || '#757575';
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };


  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1b5e20',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TrendingUpIcon sx={{ fontSize: 40 }} />
          {t('subsidyRecommendations')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="body1" sx={{ color: '#558b2f' }}>
            {language === 'ta'
              ? 'உங்கள் விவசாய சுயவிவரத்தின் அடிப்படையில் AI-இயங்கும் மானிய பரிந்துரைகள்'
              : 'AI-powered subsidy recommendations based on your farming profile'}
          </Typography>
          {modelUsed && (
            <Chip
              label={aiPowered ? t('aiPowered') : t('ruleBased')}
              color={aiPowered ? 'success' : 'default'}
              size="small"
            />
          )}
        </Box>

        {farmerProfile && (
          <Card sx={{ 
            mb: 3, 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
            border: '2px solid #2e7d32',
            boxShadow: '0 8px 24px rgba(46, 125, 50, 0.12)',
          }}>
            <CardContent sx={{ py: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}>
                  <AgriculutureIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ fontWeight: 800, color: '#1b5e20', textTransform: 'capitalize' }}
                >
                  {t('yourFarmingProfile')}
                </Typography>
              </Box>
              
              <Grid container spacing={2.5}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    background: '#ffffff',
                    border: '1px solid #c8e6c9',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  }}>
                    <LandscapeIcon sx={{ color: '#2e7d32', fontSize: 32, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: '#558b2f', fontWeight: 600, display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                      {t('landSize')}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1b5e20' }}>
                      {farmerProfile.landSize} {t('acres')}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    background: '#ffffff',
                    border: '1px solid #c8e6c9',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  }}>
                    <AgriculutureIcon sx={{ color: '#ff6f00', fontSize: 32, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: '#558b2f', fontWeight: 600, display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                      {t('farmerType')}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1b5e20', textTransform: 'capitalize' }}>
                      {t(farmerProfile.farmerType.toLowerCase())}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    background: '#ffffff',
                    border: '1px solid #c8e6c9',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  }}>
                    <LocationIcon sx={{ color: '#2196f3', fontSize: 32, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: '#558b2f', fontWeight: 600, display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                      {t('district')}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1b5e20' }}>
                      {farmerProfile.district}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    background: '#ffffff',
                    border: '1px solid #c8e6c9',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  }}>
                    <CropsIcon sx={{ color: '#8bc34a', fontSize: 32, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: '#558b2f', fontWeight: 600, display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                      {t('crops')}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#1b5e20', lineHeight: 1.3 }}>
                      {farmerProfile.crops?.join(', ')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={getRecommendations}
          disabled={loading || !farmerProfile}
          sx={{
            background: 'linear-gradient(135deg, #ff6f00 0%, #c43e00 100%)',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t('getRecommendations')
          )}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Box>
          <Box sx={{ mb: 4, p: 3, background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)', borderRadius: 3, borderLeft: '5px solid #2e7d32' }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: '#1b5e20', textTransform: 'capitalize' }}
            >
              {language === 'ta'
                ? `${recommendations.length} மானியங்கள் பரிந்துரைக்கப்படுகின்றன`
                : `${recommendations.length} Subsidies Recommended`}
            </Typography>
            <Typography variant="body2" sx={{ color: '#558b2f', mt: 1, fontWeight: 500 }}>
              {language === 'ta'
                ? 'உங்கள் விவசாய சுயவிவரத்திற்கான சிறந்த பொருத்தங்கள்'
                : 'Best matches for your farming profile'}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {recommendations.map((rec, index) => (
              <Grid item xs={12} key={rec.subsidy.id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: index < 3 ? '3px solid #ff6f00' : 'none',
                    position: 'relative',
                  }}
                >
                  {index < 3 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: '#ff6f00',
                        color: 'white',
                        px: 2,
                        py: 0.7,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      <StarIcon sx={{ fontSize: 18 }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                        {t('topMatch')}
                      </Typography>
                    </Box>
                  )}

                  <Accordion defaultExpanded={index === 0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ 
                        backgroundColor: '#f1f8e9',
                        pt: index < 3 ? 4 : 2,
                      }}
                    >
                      <Box sx={{ width: '100%', pr: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: '#1b5e20', flex: 1, pr: 2 }}
                          >
                            {rec.subsidy.displayName || rec.subsidy.name}
                          </Typography>
                          <Chip
                            label={`${rec.matchPercentage.toFixed(2)}% ${t('match')}`}
                            color="success"
                            sx={{ fontWeight: 700, flexShrink: 0 }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={rec.subsidy.category}
                            size="small"
                            sx={{
                              backgroundColor: getCategoryColor(rec.subsidy.category),
                              color: 'white',
                            }}
                          />
                          <Chip
                            label={formatAmount(rec.subsidy.amount)}
                            size="small"
                            sx={{
                              backgroundColor: '#2e7d32',
                              color: 'white',
                              fontWeight: 700,
                            }}
                          />
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(rec.matchPercentage, 100)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#2e7d32',
                            },
                          }}
                        />
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Typography
                          variant="body1"
                          sx={{ mb: 3, lineHeight: 1.8 }}
                        >
                          {rec.subsidy.displayDescription || rec.subsidy.description}
                        </Typography>

                        {rec.reasons.length > 0 && (
                          <Box sx={{ mb: 3, p: 2, backgroundColor: '#e8f5e9', borderRadius: 2, borderLeft: '4px solid #2e7d32' }}>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 700, mb: 2, color: '#1b5e20', fontSize: '1rem' }}
                            >
                              {t('whyRecommended')}
                            </Typography>
                            {rec.reasons.map((reason, i) => (
                              <Box
                                key={i}
                                sx={{ display: 'flex', alignItems: 'start', mb: 1 }}
                              >
                                <CheckIcon
                                  sx={{ color: '#2e7d32', mr: 1.5, mt: 0.3, fontSize: 22, flexShrink: 0 }}
                                />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>{reason}</Typography>
                              </Box>
                            ))}
                          </Box>
                        )}

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, borderTop: '3px solid #2e7d32' }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mb: 2, color: '#1b5e20', fontSize: '1rem', textTransform: 'capitalize' }}
                              >
                                {language === 'ta' ? 'தகுதி அளவுகோல்' : 'Eligibility Criteria'}
                              </Typography>
                              {rec.subsidy.eligibility ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    <Box component="span" sx={{ fontWeight: 700, color: '#2e7d32', mr: 1 }}>• Minimum Land:</Box> 
                                    {rec.subsidy.eligibility.minLandSize || 0} Acres
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    <Box component="span" sx={{ fontWeight: 700, color: '#2e7d32', mr: 1 }}>• Farmer Type:</Box> 
                                    {Array.isArray(rec.subsidy.eligibility.farmerType) ? rec.subsidy.eligibility.farmerType.join(', ') : 'All'}
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    <Box component="span" sx={{ fontWeight: 700, color: '#2e7d32', mr: 1 }}>• Crops:</Box> 
                                    {Array.isArray(rec.subsidy.eligibility.crops) ? rec.subsidy.eligibility.crops.join(', ') : 'All'}
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                  {t('noEligibilityDataAvailable')}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, borderTop: '3px solid #ff6f00' }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mb: 2, color: '#1b5e20', fontSize: '1rem', textTransform: 'capitalize' }}
                              >
                                {language === 'ta' ? 'தேவைப்படும் ஆவணங்கள்' : 'Required Documents'}
                              </Typography>
                              {rec.subsidy.documents && rec.subsidy.documents.length > 0 ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                  {rec.subsidy.documents.map((doc, i) => (
                                    <Typography key={i} variant="body2" sx={{ fontWeight: 500 }}>
                                      • {doc}
                                    </Typography>
                                  ))}
                                </Box>
                              ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                  {t('noDocumentsSpecified')}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                        </Grid>

                        <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Button
                            variant="contained"
                            endIcon={<OpenInNewIcon />}
                            onClick={() => {
                              if (rec.subsidy.applicationUrl) {
                                try {
                                  const newWindow = window.open(rec.subsidy.applicationUrl, '_blank', 'noopener,noreferrer');
                                  if (!newWindow) {
                                    alert(language === 'ta' 
                                      ? 'உலாவி பாப்-அப் முடக்கப்பட்டிருக்கலாம். தயவுசெய்து பாப்-அப்களை அனுமதிக்கவும்।' 
                                      : 'Please check your browser popup settings or try the link manually');
                                  }
                                } catch (err) {
                                  console.error('Error opening link:', err);
                                  alert(language === 'ta'
                                    ? 'URL திறக்க முடியவில்லை. தயவுசெய்து பின்னர் முயற்சி செய்யவும்।'
                                    : 'Unable to open the URL. Please try again.');
                                }
                              }
                            }}
                            disabled={!rec.subsidy.applicationUrl}
                            sx={{
                              background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                              fontWeight: 600,
                              textTransform: 'capitalize',
                              py: 1,
                              px: 3,
                              cursor: rec.subsidy.applicationUrl ? 'pointer' : 'not-allowed',
                            }}
                          >
                            {t('applyNow')}
                          </Button>
                          {rec.subsidy.applicationUrl && (
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#666',
                                fontSize: '0.75rem',
                                fontStyle: 'italic'
                              }}
                            >
                              {rec.subsidy.applicationUrl}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {!farmerProfile && !loading && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {language === 'ta'
            ? 'மானிய பரிந்துரைகளைப் பெற உங்கள் விவசாயி சுயவிவரத்தை முடிக்கவும்'
            : 'Please complete your farmer profile to get subsidy recommendations'}
        </Alert>
      )}
    </Box>
  );
};

export default SubsidyRecommender;
