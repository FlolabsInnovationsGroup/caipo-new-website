/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { toast } from 'sonner'

// Mock sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
  Toaster: jest.fn(() => null),
}))

describe('Toast', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('calls toast.success with the correct message', () => {
    toast.success('Success message')
    expect(toast.success).toHaveBeenCalledWith('Success message')
  })

  it('calls toast.error with the correct message', () => {
    toast.error('Error message')
    expect(toast.error).toHaveBeenCalledWith('Error message')
  })

  it('calls toast.info with the correct message', () => {
    toast.info('Info message')
    expect(toast.info).toHaveBeenCalledWith('Info message')
  })

  it('calls toast.warning with the correct message', () => {
    toast.warning('Warning message')
    expect(toast.warning).toHaveBeenCalledWith('Warning message')
  })

  it('can call multiple toast functions in sequence', () => {
    toast.success('First message')
    toast.error('Second message')
    toast.info('Third message')
    
    expect(toast.success).toHaveBeenCalledWith('First message')
    expect(toast.error).toHaveBeenCalledWith('Second message')
    expect(toast.info).toHaveBeenCalledWith('Third message')
  })
}) 