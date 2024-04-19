let a = {
  alwayson_scripts: {
    ADetailer: {
      args: [
        false,
        false,
        {
          ad_cfg_scale: 7,
          ad_checkpoint: 'Use same checkpoint',
          ad_clip_skip: 1,
          ad_confidence: 0.3,
          ad_controlnet_guidance_end: 1,
          ad_controlnet_guidance_start: 0,
          ad_controlnet_model: 'None',
          ad_controlnet_module: 'None',
          ad_controlnet_weight: 1,
          ad_denoising_strength: 0.4,
          ad_dilate_erode: 4,
          ad_inpaint_height: 512,
          ad_inpaint_only_masked: true,
          ad_inpaint_only_masked_padding: 32,
          ad_inpaint_width: 512,
          ad_mask_blur: 4,
          ad_mask_k_largest: 0,
          ad_mask_max_ratio: 1,
          ad_mask_merge_invert: 'None',
          ad_mask_min_ratio: 0,
          ad_model: 'face_yolov8n.pt',
          ad_model_classes: '',
          ad_negative_prompt: '',
          ad_noise_multiplier: 1,
          ad_prompt: '',
          ad_restore_face: false,
          ad_sampler: 'DPM++ 2M Karras',
          ad_steps: 28,
          ad_use_cfg_scale: false,
          ad_use_checkpoint: false,
          ad_use_clip_skip: false,
          ad_use_inpaint_width_height: false,
          ad_use_noise_multiplier: false,
          ad_use_sampler: false,
          ad_use_steps: false,
          ad_use_vae: false,
          ad_vae: 'Use same VAE',
          ad_x_offset: 0,
          ad_y_offset: 0,
          is_api: []
        },
        {
          ad_cfg_scale: 7,
          ad_checkpoint: 'Use same checkpoint',
          ad_clip_skip: 1,
          ad_confidence: 0.3,
          ad_controlnet_guidance_end: 1,
          ad_controlnet_guidance_start: 0,
          ad_controlnet_model: 'None',
          ad_controlnet_module: 'None',
          ad_controlnet_weight: 1,
          ad_denoising_strength: 0.4,
          ad_dilate_erode: 4,
          ad_inpaint_height: 512,
          ad_inpaint_only_masked: true,
          ad_inpaint_only_masked_padding: 32,
          ad_inpaint_width: 512,
          ad_mask_blur: 4,
          ad_mask_k_largest: 0,
          ad_mask_max_ratio: 1,
          ad_mask_merge_invert: 'None',
          ad_mask_min_ratio: 0,
          ad_model: 'None',
          ad_model_classes: '',
          ad_negative_prompt: '',
          ad_noise_multiplier: 1,
          ad_prompt: '',
          ad_restore_face: false,
          ad_sampler: 'DPM++ 2M Karras',
          ad_steps: 28,
          ad_use_cfg_scale: false,
          ad_use_checkpoint: false,
          ad_use_clip_skip: false,
          ad_use_inpaint_width_height: false,
          ad_use_noise_multiplier: false,
          ad_use_sampler: false,
          ad_use_steps: false,
          ad_use_vae: false,
          ad_vae: 'Use same VAE',
          ad_x_offset: 0,
          ad_y_offset: 0,
          is_api: []
        }
      ]
    },
    'API payload': { args: [] },
    ControlNet: {
      args: [
        {
          advanced_weighting: null,
          batch_images: '',
          control_mode: 'Balanced',
          enabled: true,
          guidance_end: 1,
          guidance_start: 0,
          hr_option: 'Both',
          image: { image: 'base64image placeholder', mask: 'base64image placeholder' },
          inpaint_crop_input_image: false,
          input_mode: 'simple',
          is_ui: true,
          loopback: false,
          low_vram: false,
          model: 'control_v11p_sd15_lineart [43d4be0d]',
          module: 'lineart_standard (from white bg & black line)',
          output_dir: '',
          pixel_perfect: false,
          processor_res: 512,
          resize_mode: 'Crop and Resize',
          save_detected_map: true,
          threshold_a: -1,
          threshold_b: -1,
          weight: 1
        },
        {
          advanced_weighting: null,
          batch_images: '',
          control_mode: 'Balanced',
          enabled: false,
          guidance_end: 1,
          guidance_start: 0,
          hr_option: 'Both',
          image: null,
          inpaint_crop_input_image: false,
          input_mode: 'simple',
          is_ui: true,
          loopback: false,
          low_vram: false,
          model: 'None',
          module: 'none',
          output_dir: '',
          pixel_perfect: false,
          processor_res: -1,
          resize_mode: 'Crop and Resize',
          save_detected_map: true,
          threshold_a: -1,
          threshold_b: -1,
          weight: 1
        },
        {
          advanced_weighting: null,
          batch_images: '',
          control_mode: 'Balanced',
          enabled: false,
          guidance_end: 1,
          guidance_start: 0,
          hr_option: 'Both',
          image: null,
          inpaint_crop_input_image: false,
          input_mode: 'simple',
          is_ui: true,
          loopback: false,
          low_vram: false,
          model: 'None',
          module: 'none',
          output_dir: '',
          pixel_perfect: false,
          processor_res: -1,
          resize_mode: 'Crop and Resize',
          save_detected_map: true,
          threshold_a: -1,
          threshold_b: -1,
          weight: 1
        }
      ]
    },
    'Extra options': { args: [] },
    'LoRA Block Weight': {
      args: [
        'NONE:0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\nALL:1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\nINS:1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0\nIND:1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0\nINALL:1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0\nMIDD:1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0\nOUTD:1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0\nOUTS:1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1\nOUTALL:1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1\nALL0.5:0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5',
        true,
        0,
        'values',
        '0,0.25,0.5,0.75,1',
        'Block ID',
        'IN05-OUT05',
        'none',
        '',
        '0.5,1',
        'BASE,IN00,IN01,IN02,IN03,IN04,IN05,IN06,IN07,IN08,IN09,IN10,IN11,M00,OUT00,OUT01,OUT02,OUT03,OUT04,OUT05,OUT06,OUT07,OUT08,OUT09,OUT10,OUT11',
        1.0,
        'black',
        '20',
        false,
        'ATTNDEEPON:IN05-OUT05:attn:1\n\nATTNDEEPOFF:IN05-OUT05:attn:0\n\nPROJDEEPOFF:IN05-OUT05:proj:0\n\nXYZ:::1',
        false,
        false
      ]
    },
    Refiner: { args: [false, '', 0.8] },
    Seed: { args: [-1, false, -1, 0, 0, 0] },
    'Segment Anything': {
      args: [
        false,
        false,
        0,
        null,
        [],
        0,
        false,
        [],
        [],
        false,
        0,
        1,
        false,
        false,
        0,
        null,
        [],
        -2,
        false,
        [],
        false,
        0,
        null,
        null
      ]
    },
    'Super Marger Generation Parameter Getter': { args: [] },
    'Tiled Diffusion': {
      args: [
        false,
        'MultiDiffusion',
        false,
        true,
        1024,
        1024,
        96,
        96,
        48,
        4,
        'None',
        2,
        false,
        10,
        1,
        1,
        64,
        false,
        false,
        false,
        false,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0,
        false,
        0.4,
        0.4,
        0.2,
        0.2,
        '',
        '',
        'Background',
        0.2,
        -1.0
      ]
    },
    'Tiled VAE': { args: [false, 1536, 96, true, true, true, false] },
    demofusion: { args: [false, 'DemoFusion', true, 128, 64, 4, 2, false, 10, 1, 1, 64, false, true, 3, 1, 1] }
  },
  batch_size: 1,
  cfg_scale: 7,
  comments: {},
  disable_extra_networks: false,
  do_not_save_grid: false,
  do_not_save_samples: false,
  enable_hr: false,
  height: 512,
  hr_negative_prompt: '',
  hr_prompt: '',
  hr_resize_x: 0,
  hr_resize_y: 0,
  hr_scale: 2,
  hr_second_pass_steps: 0,
  hr_upscaler: 'Latent',
  n_iter: 1,
  negative_prompt: '',
  override_settings: {},
  override_settings_restore_afterwards: true,
  prompt:
    'scooter,simple,no people,parked in front of an art gallery,sunny,white background,realistic photo,best quality,detailed texture,super detail,ultra realistic material,--ar 3:2 --q 2 --v 5,<lora:scooter:1>,',
  restore_faces: false,
  s_churn: 0.0,
  s_min_uncond: 0,
  s_noise: 1.0,
  s_tmax: null,
  s_tmin: 0.0,
  sampler_name: 'DPM++ 2M Karras',
  script_args: [],
  script_name: null,
  seed: -1,
  seed_enable_extras: true,
  seed_resize_from_h: -1,
  seed_resize_from_w: -1,
  steps: 20,
  styles: [],
  subseed: -1,
  subseed_strength: 0,
  tiling: false,
  width: 512
}
